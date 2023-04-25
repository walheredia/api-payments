import { Payment } from './payments.types';
import * as paymentDal from '../../dal/payment';

export const createPaymentService = async (
    param: Payment
  ): Promise<Payment> => {
    return await paymentDal.createPayment(param);
  };