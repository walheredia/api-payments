import * as businessDal from "../../dal/business";
import {
  Business,
  deleteBusinessByCodeParam,
  getBusinessByCodeParam,
  getBusinessByIdParam,
  putBusinessByCodeParam,
  putBusinessPayload,
} from "./business.types";

export const createBusinessService = async (
  param: Business
): Promise<Business> => {
  return await businessDal.createBusiness(param);
};

export const getBusiness = async (): Promise<Business[] | null> => {
  return await businessDal.getBusiness();
};

export const getBusinessByCodeService = async (
  param: getBusinessByCodeParam
): Promise<Business | null> => {
  return await businessDal.getBusinessByCode(param);
};

export const getBusinessByIdService = async (
  param: getBusinessByIdParam
): Promise<Business | null> => {
  return await businessDal.getBusinessById(param);
};

export const updateBusinessByCodeService = async (
  param: putBusinessByCodeParam,
  businessPayload: putBusinessPayload
): Promise<Business | null> => {
  return await businessDal.updateBusinessByCode(param, businessPayload);
};

export const deleteBusinessByCodeService = async (
  param: deleteBusinessByCodeParam
): Promise<Business | null> => {
  return await businessDal.deleteBusinessByCode(param);
};

export const updateLastPaymentService = async (
  param: getBusinessByIdParam
): Promise<Business | null> => {
  return await businessDal.updateLastPayment(param);
};