import { NextFunction, Request, Response, Router } from "express";
import ApiResponse from "../../common";
import { getBusiness, getBusinessByCodeService, updateLastPaymentService } from "../business/business.services";
import { buildStatusResponse, performPaymentRequestProcessAndReturnResume, performPaymentVerificationProcessAndReturnResume } from "./payments.helper";
import { createPaymentService } from "./payments.services";
import { Payment } from "./payments.types";

const router = Router();

export const handlerGetPaymentStatusByBusinessCode = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { businessCode } = req.params;
    const business = await getBusinessByCodeService({ code: businessCode });
    if (business) {
      return res
        .status(200)
        .json(ApiResponse.successResponse({ data: buildStatusResponse(business) }));
    } else {
      return res
        .status(404)
        .json(ApiResponse.errorResponse({ message: "Business not found" }));
    }
  } catch (err) {
    const error = err as Error;
    return res
      .status(500)
      .json(ApiResponse.errorResponse({ message: error.message }));
  }
};

export const handlerPostPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { businessCode } = req.params;
    const business = await getBusinessByCodeService({code: businessCode});
    if(!business)
      return res
        .status(404)
        .json(ApiResponse.errorResponse({ message: "Business not found" }));
    
    const paymentPayload = {
      business: business._id,
    } as Payment;
    await createPaymentService(paymentPayload);
    await updateLastPaymentService({_id: business._id});

    return res
      .status(200)
      .json(ApiResponse.successResponse({ data: "Payment registered successfully" }));
  } catch (err) {
    const error = err as Error;
    return res
      .status(500)
      .json(ApiResponse.errorResponse({ message: error.message }));
  }
};

export const handlerPostPaymentVerificationProcess = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const business = await getBusiness();
    const result = await performPaymentVerificationProcessAndReturnResume(business);

    return res
      .status(200)
      .json(ApiResponse.successResponse({ data: result }));
    
  } catch (err) {
    const error = err as Error;
    return res
      .status(500)
      .json(ApiResponse.errorResponse({ message: error.message }));
  }
};

export const handlerPostPaymentRequestProcess = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const business = await getBusiness();
    const result = await performPaymentRequestProcessAndReturnResume(business);

    return res
      .status(200)
      .json(ApiResponse.successResponse({ data: result }));
    
  } catch (err) {
    const error = err as Error;
    return res
      .status(500)
      .json(ApiResponse.errorResponse({ message: error.message }));
  }
};

export default router;
