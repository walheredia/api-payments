import { WebHookPayment } from "./wh.types";
import * as webhookPaymentDal from "../../dal/wh";

export const createWebhookService = async (
    param: WebHookPayment
): Promise<WebHookPayment> => {
    return await webhookPaymentDal.createWhPayment(param);
};