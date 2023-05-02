import { NextFunction, Request, Response, Router } from 'express';
import ApiResponse from '../../common';
import { WebHookPayment } from './wh.types';
import { createWebhookService } from './wh.services';
import mercadopago from 'mercadopago';

mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN || '',
});

const router = Router();

export const handlerWh = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        const webHook = req.body as WebHookPayment;
        const resCreateWebhook = await createWebhookService(webHook);
        /*const paymentInfo:any = await mercadopago.payment.findById(Number(1312755552)).then(function(payment){
            return payment;
          }).catch(function(error){
            return error;
          });*/
        return res
        .status(200)
        .json(ApiResponse.successResponse({data: resCreateWebhook}));
    } catch (err) {
        const error = err as Error;
        throw new Error(error.message);
    }
};

export default router;