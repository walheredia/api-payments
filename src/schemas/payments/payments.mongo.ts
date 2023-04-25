import { Schema, model } from "mongoose";
import { Payment } from "../../components/payments/payments.types";
import { PaymentDB } from "../../utils/constants";

const BusinessSchema = new Schema<Payment>(
    {
        business: {
            type: Schema.Types.ObjectId,
        },
        isActive: {
            type: Boolean,
            default: true,
        }
    },
    {
        collection: PaymentDB,
        timestamps: true,
        versionKey: false,
    }
)

export const PaymentModel = model<Payment>(PaymentDB, BusinessSchema);
export default PaymentModel;