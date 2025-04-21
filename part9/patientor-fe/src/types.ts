import { ChangeEvent } from "react";
import { SelectChangeEvent } from "@mui/material";

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
type Modify<T, R> = Omit<T, keyof R> & R;
type AugmentUnion<T, A> = T extends unknown ? T & A : never;

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: PatientEntry[]
}

export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;

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

export type NewBaseEntry = Omit<BaseEntry, 'id'>;

export interface OccupationalHealthcare {
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  }
}

export interface POccupationalHealthcareEntry
  extends BaseEntry, OccupationalHealthcare {
  type: EntryType.OccupationalHealthcare;
}

export interface Hospital {
  discharge: {
    date: string;
    criteria: string;
  }
}

export interface PHospitalEntry
  extends BaseEntry, Hospital {
  type: EntryType.Hospital;
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3
}

export interface HealthCheck {
  healthCheckRating: HealthCheckRating;
}

export interface PHealthCheckEntry
    extends BaseEntry, HealthCheck {
  type: EntryType.HealthCheck;
}

export type PatientEntry =
    | POccupationalHealthcareEntry
    | PHospitalEntry
    | PHealthCheckEntry;

export type PopulatedEntry <T = PatientEntry> = AugmentUnion<T, {
  diagnoses?: Diagnosis[];
}>;

export type PopulatedPatient = Modify<Patient, {
  entries: PopulatedEntry[];
}>;

export type NewEntry = UnionOmit<PatientEntry, 'id'>;

export type OnChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent;
