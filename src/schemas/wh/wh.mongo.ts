import { Schema, model } from "mongoose";
import { WhDB } from "../../utils/constants";
import { WebHookPayment } from "../../components/wh/wh.types";

const WebhookSchema = new Schema<WebHookPayment>(
    {
        id: { 
            type: Number, required: true
        },
        live_mode: {
            type: Boolean, required: true
        },
        date_created: {
            type: Date, required: true
        },
        user_id: {
            type: Number, required: true
        },
        api_version: {
            type: String, required: true
        },
        action: {
            type: String, required: true
        },
        data: {
            id: {
                type: String,
                required: true
            }
        }
    },
    {
        collection: WhDB,
        timestamps: true,
        versionKey: false,
    }
)

export const WhModel = model<WebHookPayment>(WhDB, WebhookSchema);
export default WhModel

;