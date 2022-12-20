import {
  Business,
  deleteBusinessByCodeParam,
  getBusinessByCodeParam,
  getBusinessByIdParam,
  putBusinessByCodeParam,
  putBusinessPayload,
} from "../components/business/business.types";
import { paymentStatus } from "../components/payments/payments.types";
import BusinessModel from "../schemas/business/business.mongo";

export const createBusiness = async (param: Business): Promise<Business> => {
  return await BusinessModel.create(param);
};

export const getBusiness = async (): Promise<Business[]> => {
  return await BusinessModel.find({ isActive: 1 }).lean();
};

export const getBusinessByCode = async (
  param: getBusinessByCodeParam
): Promise<Business | null> => {
  return await BusinessModel.findOne({ isActive: 1, code: param.code });
};

export const getBusinessById = async (
  param: getBusinessByIdParam
): Promise<Business | null> => {
  return await BusinessModel.findOne({ isActive: 1, _id: param._id });
};

export const updateBusinessByCode = async (
  param: putBusinessByCodeParam,
  businessPayload: putBusinessPayload
): Promise<Business | null> => {
  return await BusinessModel.findOneAndUpdate(
    { code: param.code, isActive: true },
    { $set: businessPayload },
    { returnOriginal: false }
  );
};

export const deleteBusinessByCode = async (
  param: deleteBusinessByCodeParam
): Promise<Business | null> => {
  return await BusinessModel.findOneAndUpdate(
    { code: param.code, isActive: true },
    { $set: { isActive: false } },
    { returnOriginal: false}
  );
};

export const updateLastPayment = async (
  param: getBusinessByIdParam
): Promise<Business | null> => {
  return await BusinessModel.findOneAndUpdate({ isActive: 1, _id: param._id }, { lastPayment: new Date, paymentStatus: paymentStatus.paidOut});
};
