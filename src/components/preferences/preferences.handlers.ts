import { NextFunction, Request, Response, Router } from "express";
import ApiResponse from "../../common";
import { Preference} from "./preferences.types";
import mercadopago from 'mercadopago';
import { createPreferenceHelper } from "./preferences.helper";

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

    const internalResult = createPreferenceHelper(PreferencePayload);
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