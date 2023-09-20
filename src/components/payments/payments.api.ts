import { Router } from 'express';
import { handlerGetPaymentStatusByBusinessCode, handlerPostPayment, handlerPostPaymentVerificationProcess } from './payments.handlers';

const router = Router();

//obtiene el estado del pago de una empresa, y devuelve ademas el link de pago vigente, si posee.
router.get('/status/:businessCode', handlerGetPaymentStatusByBusinessCode);

//puntero que hace el proceso de verificación y cambia los estados del pago, 
//y solicita pagos además
router.post('/verificationProcess', handlerPostPaymentVerificationProcess);

//proceso de solicitud de pagos de MP
//debe ejecutarse con un cron?
//router.post('/requestProcess', handlerPostPaymentRequestProcess);

//crea un pago para una empresa
router.post('/:businessCode', handlerPostPayment);

export default router;