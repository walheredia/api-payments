import { GetExamplePayload } from "../components/email/example.types";
import BusinessModel from "../schemas/email/business.mongo";

export const getExample = async (param: GetExamplePayload): Promise<Number> => {
    let date = new Date();
    date.setDate(date.getDate() - param.numberOfDaysParam);
    console.log(await BusinessModel.find({}));
    return Number(await BusinessModel.countDocuments({}).lean());
};
