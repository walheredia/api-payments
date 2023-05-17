import * as preferenceDal from "../../dal/preference";
import {
  Preference
} from "./preferences.types";

export const createPreferenceService = async (
  param: Preference
): Promise<Preference> => {
  return await preferenceDal.createPreference(param);
};

export const updatePreferenceStatusService = async (
  businessCode: string,
  newStatus: number
): Promise<Preference | null> => {
  return await preferenceDal.updatePreferenceStatus( businessCode, newStatus);
};

