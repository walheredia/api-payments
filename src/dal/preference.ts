import {
  Preference
} from "../components/preferences/preferences.types";
import PreferenceModel from "../schemas/preferences/preferences.mongo";

export const createPreference = async (param: Preference): Promise<Preference> => {
  return await PreferenceModel.create(param);
};