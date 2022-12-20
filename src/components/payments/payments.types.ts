import { Schema } from 'mongoose';

export interface statusResponse {
    paymentStatus: paymentStatus,
}

export enum paymentStatus {
    pending = 'pending',
    gracePeriodExpired = 'expired',
    paidOut = 'paidOut'
}

export interface Payment {
    _id: Schema.Types.ObjectId,
    business: Schema.Types.ObjectId,
    isActive: boolean,
    createdAt?: Date,
    updatedAt?: Date,
}