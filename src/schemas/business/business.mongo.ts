import { Schema, model } from "mongoose";
import { Business, paymentStatus } from "../../components/business/business.types";
import { BusinessDB } from "../../utils/constants";

const BusinessSchema = new Schema<Business>(
    {
        name: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
        },
        solution: {
            type: String,
            required: true,
        },
        expirationDay: {
            type: Number,
            required: true,
        },
        gracePeriodDays: {
            type: Number,
            required: true,
        },
        paymentStatus: {
            type: String,
            default: paymentStatus.pending,
            required: true
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        requirePayment: {
            type: Boolean,
            default: true
        }
    },
    {
        collection: BusinessDB,
        timestamps: true,
        versionKey: false,
    }
)

export const BusinessModel = model<Business>(BusinessDB, BusinessSchema);
export default BusinessModel;