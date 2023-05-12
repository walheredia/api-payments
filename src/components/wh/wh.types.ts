export interface WebHookPayment {
    id: number;
    live_mode: boolean;
    type: string;
    date_created: Date;
    user_id: number;
    api_version: string;
    action: string;
    data: {
        id: string;
    }
}

export enum webHookActions {
    created = 'payment.created'
}

export enum paymentStatus {
    approved = 'approved'
}