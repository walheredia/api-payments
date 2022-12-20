import { Payment } from "../components/payments/payments.types";
import PaymentModel from "../schemas/payments/payments.mongo";

export const createPayment = async (param: Payment): Promise<Payment> => {
    return await PaymentModel.create(param);
};