import {
  NewBaseEntry,
  EntryType,
  HealthCheck,
  HealthCheckRating,
  Hospital,
  OccupationalHealthcare,
  NewEntry,
} from "./types.ts";

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const enumArr =
    <T extends Record<string, string | number>>(enumObj: T): (T[keyof T])[] => {
      return Object.keys(enumObj)
        .filter(key => isNaN(Number(key)))
        .map(key => enumObj[key as keyof T]);
    };

export const addSpacesToCaps = (str: string) =>
  str.replace(/([A-Z])/g, ' $1').trim();

export const dateNowISO = () => (new Date()).toISOString().split('T')[0];

export const isHealthCheckRating = (val: unknown): val is HealthCheckRating => {
  return typeof val === 'number' && val in HealthCheckRating;
};

export const toNewEntry = (
  type: EntryType,
  newBaseEntry: NewBaseEntry,
  healthCheck: HealthCheck,
  hospital: Hospital,
  occupationalHealthCare: OccupationalHealthcare
): NewEntry => {
  const baseEntry: NewBaseEntry = {
    ...newBaseEntry
  };

  let entry: NewEntry | null = null;

  switch (type) {
  case EntryType.HealthCheck:
    entry = {
      type,
      ...baseEntry,
      ...healthCheck,
    };
    break;
  case EntryType.Hospital:
    entry = {
      type,
      ...baseEntry,
      ...hospital,
    };
    break;
  case EntryType.OccupationalHealthcare:
    entry = {
      type,
      ...baseEntry,
      ...occupationalHealthCare,
    };
    break;
  default:
    assertNever(type);
  }

  if (!entry) throw new Error(`Unrecognized type "${type}"`);

  return entry;
};

export const healthRatingLength: number = Object.entries(HealthCheckRating).length / 2;

export const calculateRating = (rating: number): number => Math.abs(rating - healthRatingLength);
