import axios from "axios";
import { NewEntry, Patient, PatientFormValues, PopulatedEntry, PopulatedPatient } from "../types";
import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const get = async (id: string): Promise<PopulatedPatient> => {
  const { data } = await axios.get<PopulatedPatient>(
    `${apiBaseUrl}/patients/${id}`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const createEntry = async (id: string, object: NewEntry): Promise<PopulatedEntry> => {
  const { data } = await axios.post<PopulatedEntry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );

  return data;
};

export default {
  getAll,
  get,
  create,
  createEntry,
};
