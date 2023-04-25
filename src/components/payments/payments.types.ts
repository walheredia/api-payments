import { Schema } from 'mongoose';
import { Business } from '../business/business.types';

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

export interface resultPaymentVerificationProcess {
    totalCompanies: number,
    totalPending: number,
    totalExpired: number,
    totalPaidOut: number,
    totalNotRequiredPayment: number
}

export interface paymentStatusParam {
    newStatus: paymentStatus,
    business: Business
}