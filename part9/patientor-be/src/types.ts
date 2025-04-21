import { z } from "zod";
import { NewEntrySchema, NewPatientSchema } from "./utils/utils";

type Modify<T, R> = Omit<T, keyof R> & R;
export type AugmentUnion<T, A> = T extends unknown ? T & A : never;

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

export interface Patient {
    id: string;
    name: string;
    ssn: string;
    occupation: string;
    gender: Gender;
    dateOfBirth: string;
    entries: Entry[]
}

export type PatientPublicEntry = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = z.infer<typeof NewPatientSchema>;

export type NewEntry = z.infer<typeof NewEntrySchema>;

export enum EntryType {
    'OccupationalHealthcare' = 'OccupationalHealthcare',
    'Hospital' = 'Hospital',
    'HealthCheck' = 'HealthCheck',
}

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: EntryType.OccupationalHealthcare;
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    }
}

interface HospitalEntry extends BaseEntry {
    type: EntryType.Hospital;
    discharge: {
        date: string;
        criteria: string;
    }
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
    type: EntryType.HealthCheck;
    healthCheckRating: HealthCheckRating;
}

export type Entry =
    | OccupationalHealthcareEntry
    | HospitalEntry
    | HealthCheckEntry
    ;

export type PopulatedEntry = AugmentUnion<Entry, {
    diagnoses?: Diagnosis[];
}>;

export type PopulatedPatient = Modify<Patient, {
    entries: PopulatedEntry[];
}>;
