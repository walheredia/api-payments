import { Router } from 'express';
import validateSchema from '../../middlewares/validation';
import { PreferenceSchema } from '../../schemas/preferences/preferences.schema';
import { handlerPostPreference } from './preferences.handlers';

const router = Router();

router.post('/', validateSchema(PreferenceSchema), handlerPostPreference);

//todo deshabilitar preferencia una vez que el pago se efectuó con éxito 

export default router;