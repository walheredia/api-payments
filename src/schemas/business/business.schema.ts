import * as yup from 'yup';

export const BusinessSchema = yup.object({
    solution: yup.string().required(),
    name: yup.string().required(),
    code: yup.string(),
    isActive: yup.boolean(),
    requirePaymentDay: yup.number().required(),
    requirePayment: yup.boolean().required(),
    expirationDay: yup.number().required(),
    gracePeriodDays: yup.number().required(),
    paymentStatus: yup.string(),
    lastPayment: yup.date(),
});

export const BusinessUpdateSchema = yup.object({
    solution: yup.string().notRequired(),
    name: yup.string().notRequired(),
    requirePayment: yup.boolean().notRequired(),
    expirationDay: yup.number().notRequired(),
    gracePeriodDays: yup.number().notRequired()
});