import { updatePaymentStatus } from "../../dal/business";
import { Business } from "../business/business.types";
import { paymentStatus, paymentStatusParam, resultPaymentVerificationProcess, statusResponse } from "./payments.types";

export const buildStatusResponse = (business: Business): statusResponse => {
    const response = {
        paymentStatus: business.paymentStatus,
    }
    return response;
}

export const performPaymentVerificationProcessAndReturnResume = async (business: Business[] | null): Promise<resultPaymentVerificationProcess> => {
    const result = {
        totalCompanies: 0,
        totalPending: 0,
        totalExpired: 0,
        totalPaidOut: 0,
        totalNotRequiredPayment: 0
    }
    if(!business?.length)
        return result;
    for (const company of business) {
        result.totalCompanies++;
        if(!company.requirePayment) {
            result.totalNotRequiredPayment++;
            continue;
        }
        let newStatus:paymentStatus = paymentStatus.pending;
        const today = new Date();

        const firstDayOfMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            1,0,0,0,0
        );
        const limitDate = new Date(firstDayOfMonth);
        limitDate.setDate(company.expirationDay + company.gracePeriodDays);
        
        const todayDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            0,0,0,0
        );
        const lastMonth = new Date(
            today.getFullYear(),
            today.getMonth() - 1,
            1,0,0,0,0
        );
        const lastDayOfPreviousMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0);
        if(company.lastPayment >= firstDayOfMonth){
            newStatus = paymentStatus.paidOut;
            result.totalPaidOut++;
        } else if(todayDate > limitDate || company.lastPayment <= lastDayOfPreviousMonth) {
            newStatus = paymentStatus.gracePeriodExpired; 
            result.totalExpired++;
        } else {
            result.totalPending++;
        }
        await updatePaymentStatusIfDistinct({newStatus: newStatus, business: company});
    }
    return result;
}

const updatePaymentStatusIfDistinct = async(param: paymentStatusParam):Promise<void> => {
    if(param.newStatus !== param.business.paymentStatus){
        await updatePaymentStatus({_id: param.business._id, paymentStatus: param.newStatus});
    }
    return;
}