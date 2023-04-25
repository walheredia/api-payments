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
            company_id: { type: Number, required: true },
            email: { type: String, required: false },
        },
        isActive: {
            type: Boolean,
            default: true,
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