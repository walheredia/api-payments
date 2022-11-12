import { Schema, model, Collection } from "mongoose";
import { BusinessDB } from "../../utils/constants";
import { Business} from './business.types';

const BusinessSchema = new Schema<Business>(
    {
        _id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        }
    },
    {
        collection: BusinessDB,
        timestamps: false
    }
)

export const BusinessModel = model<Business>(BusinessDB, BusinessSchema);
export default BusinessModel;