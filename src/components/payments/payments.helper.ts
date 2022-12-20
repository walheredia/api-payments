import { Business } from "../business/business.types";
import { statusResponse } from "./payments.types";

export const buildStatusResponse = (business: Business): statusResponse => {
    const response = {
        paymentStatus: business.paymentStatus,
    }
    return response;
}

export const performPaymentVerificationProcess = (business: Business[]): any => {
    for (const company of business) {
        let a = company;
    }
}