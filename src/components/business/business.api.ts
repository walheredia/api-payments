import { Router } from 'express';
import validateSchema from '../../middlewares/validation';
import { BusinessSchema, BusinessUpdateSchema } from '../../schemas/business/business.schema';
import { handlerDeleteBusinessByCode, handlerGetBusiness, handlerPostBusiness, handlerPutBusinessByCode } from './business.handlers';

const router = Router();

router.get('/', handlerGetBusiness);
router.post('/', validateSchema(BusinessSchema), handlerPostBusiness);
router.put('/:code', validateSchema(BusinessUpdateSchema), handlerPutBusinessByCode )
router.delete('/:code', handlerDeleteBusinessByCode )

export default router;