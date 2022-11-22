import { NextFunction, Request, Response, Router } from "express";
import ApiResponse from "../../common";
import { getBusinessByCodeService } from "../business/business.services";
import { buildStatusResponse } from "./payments.helper";

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

export default router;
