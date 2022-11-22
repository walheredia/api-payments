
export interface statusResponse {
    paymentStatus: paymentStatus,
}

export enum paymentStatus {
    pending = 'pending',
    gracePeriodExpired = 'expired',
    paidOut = 'paidOut'
}