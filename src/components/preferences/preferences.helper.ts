import { getBusinessByCodeService } from "../business/business.services";
import { createPreferenceService } from "./preferences.services";
import { Preference} from "./preferences.types";
import mercadopago from 'mercadopago';

export const createPreferenceHelper = async(PreferencePayload: Preference): Promise<any> => {
    const business = await getBusinessByCodeService({code: PreferencePayload.external_reference});
    if(!business) {
      throw new Error(`Business not found with external_reference: ${PreferencePayload.external_reference}`);
    }

    PreferencePayload.back_urls = {
      success : `${process.env.APPCONT_HOST || ''}app/mp/success`,
      pending : `${process.env.APPCONT_HOST || ''}app/mp/pending`,
      failure : `${process.env.APPCONT_HOST || ''}app/mp/failure`,
    }
    const result:any = await mercadopago.preferences.create(PreferencePayload).then(function (response) {
      return response;
    })
    .catch(function (error) {
      throw new Error(error);
    });
    PreferencePayload.mp_id = result?.body?.id ?? '';
    PreferencePayload.mp_sandbox = result?.body?.init_point ?? '';
    PreferencePayload.business = business._id;
    const internalResult = await createPreferenceService(PreferencePayload);
    return internalResult;
}