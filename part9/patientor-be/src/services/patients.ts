import patients from "../../data/patients";
import { Entry, EntryType, NewEntry, NewPatient, Patient, PatientPublicEntry } from "../types";
import { v1 as uuid } from 'uuid';
import { util } from "zod";
import assertNever = util.assertNever;
import { toEntry } from "../utils/utils";

const getAll = (): Patient[] => patients;

const getAllPublic = (): PatientPublicEntry[] =>
    patients.map((patient) => {
        const { ssn, ...publicData } = patient;

        return publicData;
    });

const findById = (id: string): Patient | undefined => {
    return patients.find(p => p.id === id);
};

const add = (entry: NewPatient): Patient => {
    const newPatient: Patient = {
        id: uuid(),
        entries: [],
        ...entry
    };

    patients.push(newPatient);

    return newPatient;
};

const addEntry = (patient: Patient, newEntry: NewEntry) => {
    const entry: Entry = toEntry(newEntry);

    switch (entry.type) {
        case EntryType.HealthCheck:
            patient.entries.push(entry);
            break;
        case EntryType.Hospital:
            patient.entries.push(entry);
            break;
        case EntryType.OccupationalHealthcare:
            patient.entries.push(entry);
            break;
        default:
            assertNever(entry);
    }

    return entry;
};

export default {
    getAll,
    getAllPublic,
    findById,
    add,
    addEntry,
};
