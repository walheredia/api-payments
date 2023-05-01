import { Router } from 'express';
import { handlerWh } from './wh.handlers';

const router = Router();

router.post('/', handlerWh);

export default router;