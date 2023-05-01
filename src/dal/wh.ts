import { WebHookPayment } from "../components/wh/wh.types";
import WhModel from "../schemas/wh/wh.mongo";

export const createWhPayment = async (param: WebHookPayment): Promise<WebHookPayment> => {
    return await WhModel.create(param);
};