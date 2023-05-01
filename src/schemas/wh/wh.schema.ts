import * as yup from 'yup';

export const WebhookSchema = yup.object({
    isActive: yup.boolean(),
});