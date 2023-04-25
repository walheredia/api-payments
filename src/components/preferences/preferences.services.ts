import * as preferenceDal from "../../dal/preference";
import {
  Preference
} from "./preferences.types";

export const createPreferenceService = async (
  param: Preference
): Promise<Preference> => {
  return await preferenceDal.createPreference(param);
};