import * as yup from 'yup';

export const BusinessSchema = yup.object({
    solution: yup.string().required(),
    name: yup.string().required(),
    code: yup.string(),
    isActive: yup.boolean(),
    requirePaymentDay: yup.number().required().max(20, 'El número requirePaymentDay debe ser menor o igual a 20'),
    requirePayment: yup.boolean().required(),
    expirationDay: yup.number().required().moreThan(yup.ref('requirePaymentDay'), 'El número expirationDay debe ser mayor a requirePaymentDay').max(21, 'El número expirationDay debe ser menor o igual a 21'),
    gracePeriodDays: yup.number().required().max(5, 'El número gracePeriodDays debe ser menor o igual a 5'),
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