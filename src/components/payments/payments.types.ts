import { Schema } from 'mongoose';
import { Business } from '../business/business.types';

export interface statusResponse {
    paymentStatus: paymentStatus,
    mp_sandbox?: string | undefined,
    inGracePeriod?: boolean | undefined
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

export interface resultPaymentRequestProcess {
    totalCompanies: number,
    totalNotRequiredPayment: number,
    totalExpired: number,
    totalAlreadyPending: number,
    totalNotRequiredToday: number,
    totalRequiredNow: number
}