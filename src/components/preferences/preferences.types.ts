import { Schema } from 'mongoose';

export interface Preference {
    _id: Schema.Types.ObjectId,
    items: Item[],
    external_reference: string,
    payer: Payer,
    back_urls: {
        success: string,
        failure?: string,
        pending?: string,
    },
    isActive: boolean,
    mp_id?: string,
    mp_sandbox?: string,
    createdAt?: Date,
    updatedAt?: Date,
}

interface Item {
    title: string,
    quantity: number,
    unit_price: number,
}

interface Payer {
    company_id: number,
    email?: string,
}