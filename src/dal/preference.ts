import {
  Preference
} from "../components/preferences/preferences.types";
import PreferenceModel from "../schemas/preferences/preferences.mongo";

export const createPreference = async (param: Preference): Promise<Preference> => {
  return await PreferenceModel.create(param);
};

export const updatePreferenceStatus = async (code: string, newStatus: number): Promise<Preference | null> => {
  return await PreferenceModel.findOneAndUpdate({ isActive: 1, external_reference: code }, { isActive: 0, status: newStatus});
}