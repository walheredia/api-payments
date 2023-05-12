import { NextFunction, Request, Response, Router } from 'express';
import ApiResponse from '../../common';
import { WebHookPayment, webHookActions } from './wh.types';
import { createWebhookService } from './wh.services';
import mercadopago from 'mercadopago';
import { handlerPostPayment } from '../payments/payments.handlers';
import { getBusinessByCodeService, updateLastPaymentService } from '../business/business.services';
import { Payment } from '../payments/payments.types';
import { createPaymentService } from '../payments/payments.services';

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
            await processInternalPayment(paymentInfo.body.external_reference);
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
  const business = await getBusinessByCodeService({code: businessCode});
  if(!business)
    return false;
  const paymentPayload = {
    business: business._id,
  } as Payment;
  await createPaymentService(paymentPayload);
  await updateLastPaymentService({_id: business._id});
  return true;
}

export default router;