import { ObjectId } from "mongoose";
import { updatePaymentStatus } from "../../dal/business";
import { Business } from "../business/business.types";
import { createPreferenceHelper } from "../preferences/preferences.helper";
import { getLastPreferenceByBusinessIdService } from "../preferences/preferences.services";
import { Preference } from "../preferences/preferences.types";
import { paymentStatus, paymentStatusParam, resultPaymentRequestProcess, resultPaymentVerificationProcess, statusResponse } from "./payments.types";
import { createVerification } from "../../dal/verification";

export const buildStatusResponse = async (business: Business): Promise<statusResponse> => {
    let response: statusResponse = {
        paymentStatus: business.requirePayment ? business.paymentStatus : paymentStatus.paidOut,
    }
    if (response.paymentStatus != paymentStatus.paidOut){
        const lastPreference = await getLastPreferenceByBusinessIdService(business._id)
        if (lastPreference) {
            response.mp_sandbox = lastPreference.mp_sandbox
        }
    }
    if(response.paymentStatus == paymentStatus.pending){
        const today = new Date();
        const dayOfMonth = today.getDate();
        if(dayOfMonth >= business.expirationDay){
            response.inGracePeriod = true;
        }
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
        if(company.paymentStatus == paymentStatus.gracePeriodExpired){
            await createPreferenceIfDoesntHave(company);
            result.totalExpired++;
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

        if(company.lastPayment >= firstDayOfMonth){
            newStatus = paymentStatus.paidOut;
            result.totalPaidOut++;
        } else if(todayDate > limitDate) {
            newStatus = paymentStatus.gracePeriodExpired;
            await createPreferenceIfDoesntHave(company);
            result.totalExpired++;   
        } else {
            await createPreferenceIfDoesntHave(company);
            result.totalPending++;
        }
        await updatePaymentStatusIfDistinct({newStatus: newStatus, business: company});
    }
    return result;
}

const createPreferenceIfDoesntHave = async(company: Business):Promise<void> => {
    const lastPreference = await getLastPreferenceByBusinessIdService(company._id) 
    if(!lastPreference){
        const payload = {
            items: [ { 
                title: "AppCont Licencia",
                quantity: 1,
                unit_price: Number(process.env.SUBSCRIPTION_PRICE) || 4000,
                currency_id: "ARS",
            }],
            external_reference: company.code
        } as Preference;
        await createPreferenceHelper(payload);
        //send EMAIL here
    }
}

const updatePaymentStatusIfDistinct = async(param: paymentStatusParam):Promise<void> => {
    if(param.newStatus !== param.business.paymentStatus){
        await updatePaymentStatus({_id: param.business._id, paymentStatus: param.newStatus});
    }
    return;
}

// export const performPaymentRequestProcessAndReturnResume = async (business: Business[] | null): Promise<resultPaymentRequestProcess> => {
//     const result = {
//         totalCompanies: 0,
//         totalNotRequiredPayment: 0,
//         totalExpired: 0,
//         totalAlreadyPending: 0,
//         totalNotRequiredToday: 0,
//         totalRequiredNow: 0,
//     }
//     if(!business?.length)
//         return result;
//     for (const company of business) {
//         result.totalCompanies++;
//         if(!company.requirePayment){
//             result.totalNotRequiredPayment++;
//             continue;
//         }
//         if(company.paymentStatus == paymentStatus.gracePeriodExpired){
//             result.totalExpired++;
//             continue;
//         }
//         if (company.paymentStatus == paymentStatus.pending){
//             result.totalAlreadyPending++;
//             continue;
//         }

//         //llego acá si requiere pago, si no expiró y si no está pending.
//         const today = new Date();
//         const dayNumber = today.getDate();

//         if(dayNumber != company.requirePaymentDay){
//             result.totalNotRequiredToday++;
//             console.log('aca 4')
//             continue;
//         }

//         const lastPreference = await getLastPreferenceByBusinessIdService(company._id) 
//         if (!lastPreference) {
//             const payload = {
//                 items: [ { 
//                     title: "AppCont Licencia",
//                     quantity: 1,
//                     unit_price: Number(process.env.SUBSCRIPTION_PRICE) || 4000,
//                     currency_id: "ARS",
//                 }],
//                 external_reference: company.code
//             } as Preference;
              
//             await createPreferenceHelper(payload)
//             //await updatePaymentStatusIfDistinct({newStatus: paymentStatus.pending, business: company});
//             result.totalRequiredNow++;
//         }
//     }

//     return result;
// }