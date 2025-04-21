import { z } from 'zod';
import {
    Diagnosis,
    Entry,
    EntryType,
    Gender,
    HealthCheckRating,
    NewEntry,
    Patient,
    PopulatedEntry,
    PopulatedPatient
} from '../types';
import diagnosesService from '../services/diagnoses';
import diagnoses from '../../data/diagnoses';
import { v1 as uuid } from 'uuid';

export const NewPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
});

const BaseEntrySchema = {
    description: z.string(),
    date: z.string().date(),
    specialist: z.string(),
    diagnoses: z.array(z.string())
        .refine((codes) => codes.every(value => {
                return diagnoses.some(({ code }) => code === value);
            }),
            {
                message: 'Diagnosis codes contain invalid value(s)',
            }).optional(),
};

const sickLeaveSchema = z.preprocess((val) => {
    if (
        val &&
        typeof val === 'object' &&
        'startDate' in val &&
        'endDate' in val &&
        val.startDate === '' &&
        val.endDate === ''
    ) {
        return undefined;
    }

    return val;
}, z.object({
    startDate: z.string(),
    endDate: z.string(),
}).optional().refine((data) => {
    if (!data) return true;

    const { startDate, endDate } = data;

    const bothEmpty = startDate === '' && endDate === '';
    const bothFilled = startDate !== '' && endDate !== '';

    const bothValidDates =
        bothFilled &&
        !isNaN(Date.parse(startDate)) &&
        !isNaN(Date.parse(endDate));

    return bothEmpty || bothValidDates;
}, {
    message: 'Either both dates must be empty or both must be valid dates',
    path: ['startDate', 'endDate'],
}));

const OccupationalHealthcareEntrySchema = z.object({
    ...BaseEntrySchema,
    type: z.literal(EntryType.OccupationalHealthcare),
    employerName: z.string(),
    sickLeave: sickLeaveSchema,
});

const HospitalEntrySchema = z.object({
    ...BaseEntrySchema,
    type: z.literal(EntryType.Hospital),
    discharge: z.object({
        date: z.string().date(),
        criteria: z.string(),
    }),
});

const HealthCheckEntrySchema = z.object({
    ...BaseEntrySchema,
    type: z.literal(EntryType.HealthCheck),
    healthCheckRating: z.nativeEnum(HealthCheckRating),
});

export const NewEntrySchema =
    z.discriminatedUnion('type', [
        OccupationalHealthcareEntrySchema,
        HospitalEntrySchema,
        HealthCheckEntrySchema,
    ]);

export const populateEntry = (entry: Entry): PopulatedEntry => {
    const { diagnosisCodes } = entry;

    if (!diagnosisCodes) return entry;

    const populatedEntry: PopulatedEntry = entry;
    populatedEntry.diagnoses = diagnosisCodes.map((code: string): Diagnosis => {
        const diagnosis: Diagnosis | undefined = diagnosesService.findByCode(code);

        if (!diagnosis) throw Error(`Diagnosis ${code} not found in our system`);

        return diagnosis;
    });

    return populatedEntry;
};

export const populatePatient = (patient: Patient): PopulatedPatient => {
    if (!patient?.entries) return patient;

    const populatedPatient = patient;
    const entries: Entry[] = populatedPatient.entries;

    populatedPatient.entries = entries.map((entry: Entry): PopulatedEntry => populateEntry(entry));

    return populatedPatient;
};

export const toEntry = (newEntry: NewEntry): Entry => {
    return ({
        ...newEntry,
        id: uuid(),
    });
};
