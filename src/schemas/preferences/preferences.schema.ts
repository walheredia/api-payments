import * as yup from 'yup';

export const PreferenceSchema = yup.object({
    isActive: yup.boolean(),
});