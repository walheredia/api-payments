import { Schema } from 'mongoose';

export interface Business {
    _id: Schema.Types.ObjectId,
    solution: solution,
    name: string,
    code: string,
    isActive: boolean,
    requirePayment: boolean,
    expirationDay: number,
    gracePeriodDays: number,
    paymentStatus: paymentStatus,
    lastPayment?: Date,
    createdAt?: Date,
    updatedAt?: Date,
}

export enum paymentStatus {
    pending = 'pending',
    gracePeriodExpired = 'expired',
    paidOut = 'paidOut'
}

enum solution {
    appcont = 'AppCont'
}

export interface getBusinessByCodeParam {
    code: string,
}

export interface getBusinessByIdParam {
    _id: Schema.Types.ObjectId,
}

export interface putBusinessByCodeParam {
    code: string,
}

export interface deleteBusinessByCodeParam extends putBusinessByCodeParam {
    
}

export interface putBusinessPayload {
    solution?: solution,
    name?: string,
    requirePayment?: boolean,
    expirationDay?: number,
    gracePeriodDays?: number,
}