import { NextFunction, Request, Response, Router } from "express";
import ApiResponse from "../../common";
import {
  createPreferenceService,
} from "./preferences.services";
import { Preference} from "./preferences.types";
import mercadopago from 'mercadopago';

mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN || '',
});


const router = Router();

export const handlerPostPreference = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const PreferencePayload = req.body as Preference;
    PreferencePayload.back_urls = {
      success : `${process.env.APPCONT_HOST || ''}app/mp/success`,
      pending : `${process.env.APPCONT_HOST || ''}app/mp/pending`,
      failure : `${process.env.APPCONT_HOST || ''}app/mp/failure`,
    }
    const result:any = await mercadopago.preferences.create(PreferencePayload).then(function (response) {
      return response;
    })
    .catch(function (error) {
      throw new Error(error);
    });
    PreferencePayload.mp_id = result?.body?.id ?? '';
    PreferencePayload.mp_sandbox = result?.body?.init_point ?? '';
    const internalResult = await createPreferenceService(PreferencePayload);
    return res
      .status(200)
      .json(ApiResponse.successResponse({ data: internalResult }));
  } catch (err) {
    const error = err as Error;
    return res
      .status(500)
      .json(ApiResponse.errorResponse({ message: error.message }));
  }
};

export default router;