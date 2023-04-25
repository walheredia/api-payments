import { v4 as uuidv4 } from 'uuid';
import { putBusinessPayload } from './business.types';

export const getUUID = ():string => {
    return uuidv4();
}

export const buildPutBusinessPayload = (params: putBusinessPayload): putBusinessPayload => {
    const { solution, name, requirePayment, expirationDay, gracePeriodDays } = params;
    let response:putBusinessPayload = {}
    if (solution)
        response.solution = solution;
    if(name)
        response.name = name;
    if(requirePayment !== undefined)
        response.requirePayment = requirePayment === true ? true : false;
    if(expirationDay)
        response.expirationDay
    if(gracePeriodDays)
        response.gracePeriodDays = gracePeriodDays;
    return response;
}