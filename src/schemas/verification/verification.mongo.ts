import { Schema, model } from "mongoose";
import { VerificationDB } from "../../utils/constants";

export interface Verification {
    _id?: Schema.Types.ObjectId,
    totalCompanies: number,
    totalPending: number,
    totalExpired: number,
    totalPaidOut: number,
    totalNotRequiredPayment: number
    createdAt?: Date,
    updatedAt?: Date,
}

const VerificationSchema = new Schema<Verification>(
    {
        totalCompanies: {
            type: Number,
            required: true
        },totalPending: {
            type: Number,
            required: true
        },totalExpired: {
            type: Number,
            required: true
        },totalPaidOut: {
            type: Number,
            required: true
        },totalNotRequiredPayment: {
            type: Number,
            required: true
        },
    },
    {
        collection: VerificationDB,
        timestamps: true,
        versionKey: false,
    }
)

export const VerificationModel = model<Verification>(VerificationDB, VerificationSchema);
export default VerificationModel;