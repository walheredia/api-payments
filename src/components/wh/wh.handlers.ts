import { NextFunction, Request, Response, Router } from 'express';
import ApiResponse from '../../common';
import { WebHookPayment, paymentStatus, webHookActions } from './wh.types';
import { createWebhookService } from './wh.services';
import mercadopago from 'mercadopago';
import { getBusinessByCodeService, updateLastPaymentService } from '../business/business.services';
import { Payment } from '../payments/payments.types';
import { createPaymentService } from '../payments/payments.services';
import { updatePreferenceStatusService } from '../preferences/preferences.services';
import { PreferenceStatus } from '../preferences/preferences.types';
import mongoose from "mongoose";

mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN || '',
});

const router = Router();

export const handlerWh = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        const webHook = req.body as WebHookPayment;
        switch (webHook.action) {
          case webHookActions.created:
            const resCreateWebhook = await createWebhookService(webHook);
            const paymentInfo:any = await mercadopago.payment.findById(Number(resCreateWebhook.data.id)).then(function(payment){
              return payment;
            }).catch(function(error){
              return error;
            });
            if(paymentInfo?.response?.status == paymentStatus.approved){
              await processInternalPayment(paymentInfo.body.external_reference);
            }
            return res
              .status(200)
              .json(ApiResponse.successResponse({data: paymentInfo}));
            break;
          default:
            return res
              .status(400)
              .json(ApiResponse.errorResponse({message: 'Action not implemented'}));
            break;
        }
    } catch (err) {
        const error = err as Error;
        throw new Error(error.message);
    }
};

const processInternalPayment = async(businessCode: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const business = await getBusinessByCodeService({code: businessCode});
    if(!business) {
      throw new Error('Business not found');
    }

    const paymentPayload = {
      business: business._id,
    } as Payment;

    await createPaymentService(paymentPayload);
    await updateLastPaymentService({_id: business._id});
    await updatePreferenceStatusService(businessCode, PreferenceStatus.paidOut);

    await session.commitTransaction();
    return true;
  } catch (error) {
    await session.abortTransaction();
    return false;
  } finally {
    session.endSession();
  }
}

export default router;