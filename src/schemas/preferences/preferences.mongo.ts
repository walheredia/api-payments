import { Schema, model } from "mongoose";
import { Preference } from "../../components/preferences/preferences.types";
import { PreferenceDB } from "../../utils/constants";

const BusinessSchema = new Schema<Preference>(
    {
        items: [{ 
            title: { type: String, required: true },
            quantity: { type: Number, required: true },
            currency_id: { type: String, required: true },
            unit_price: { type: Number, required: true }
        }],
        payer: {
            company_id: { type: Number, required: false },
            email: { type: String, required: false },
        },
        external_reference: {
            type: String,
            required: true
        },
        business: {
            type: Schema.Types.ObjectId,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        status: {
            type: Number,
            default: 1,
        },
        mp_id: { type: String, required: false },
        mp_sandbox: { type: String, required: false },
    },
    {
        collection: PreferenceDB,
        timestamps: true,
        versionKey: false,
    }
)

export const PreferenceModel = model<Preference>(PreferenceDB, BusinessSchema);
export default PreferenceModel

; 