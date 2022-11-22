import { NextFunction, Request, Response, Router } from "express";
import ApiResponse from "../../common";
import { buildPutBusinessPayload, getUUID } from "./business.helper";
import {
  createBusinessService,
  deleteBusinessByCodeService,
  getBusiness,
  updateBusinessByCodeService,
} from "./business.services";
import { Business, putBusinessPayload } from "./business.types";

const router = Router();

export const handlerPostBusiness = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const BusinessPayload = req.body as Business;
    BusinessPayload.code = getUUID();
    const business = await createBusinessService(BusinessPayload);
    return res
      .status(200)
      .json(ApiResponse.successResponse({ data: business }));
  } catch (err) {
    const error = err as Error;
    return res
      .status(500)
      .json(ApiResponse.errorResponse({ message: error.message }));
  }
};

export const handlerGetBusiness = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const business = await getBusiness();
    return res
      .status(200)
      .json(ApiResponse.successResponse({ data: business }));
  } catch (err) {
    const error = err as Error;
    return res
      .status(500)
      .json(ApiResponse.errorResponse({ message: error.message }));
  }
};

export const handlerPutBusinessByCode = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const BusinessUpdatePayload: putBusinessPayload = req.body
    const { code } = req.params;
    const business = await updateBusinessByCodeService(
      { code: code },
      buildPutBusinessPayload(BusinessUpdatePayload)
    );
    return res
      .status(200)
      .json(ApiResponse.successResponse({ data: business }));
  } catch (err) {
    const error = err as Error;
    return res
      .status(500)
      .json(ApiResponse.errorResponse({ message: error.message }));
  }
};

export const handlerDeleteBusinessByCode = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { code } = req.params;
    const business = await deleteBusinessByCodeService(
      { code: code }
    );
    return res
      .status(200)
      .json(ApiResponse.successResponse({ data: business, message: 'Business succesfully deleted.' }));
  } catch (err) {
    const error = err as Error;
    return res
      .status(500)
      .json(ApiResponse.errorResponse({ message: error.message }));
  }
};

export default router;
