import { Router } from 'express';
import { handlerGetPaymentStatusByBusinessCode, handlerPostPayment, handlerPostPaymentVerificationProcess } from './payments.handlers';

const router = Router();

router.get('/status/:businessCode', handlerGetPaymentStatusByBusinessCode);
router.post('/verificationProcess', handlerPostPaymentVerificationProcess);
router.post('/:businessCode', handlerPostPayment);

export default router;