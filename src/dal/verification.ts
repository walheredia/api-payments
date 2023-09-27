import VerificationModel, { Verification } from "../schemas/verification/verification.mongo";

export const createVerification = async (param: Verification): Promise<Verification> => {
  return await VerificationModel.create(param);
};
