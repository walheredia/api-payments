import { Router } from 'express';
import validateSchema from '../../middlewares/validation';
import { PreferenceSchema } from '../../schemas/preferences/preferences.schema';
import { handlerPostPreference } from './preferences.handlers';

const router = Router();

router.post('/', validateSchema(PreferenceSchema), handlerPostPreference);

export default router;