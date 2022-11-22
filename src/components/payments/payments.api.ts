import { Router } from 'express';
import { handlerGetPaymentStatusByBusinessCode } from './payments.handlers';

const router = Router();

router.get('/status/:businessCode', handlerGetPaymentStatusByBusinessCode);

export default router;