import { EntryType, PopulatedEntry } from "../../types.ts";
import { assertNever } from "../../utils.ts";
import HospitalEntry from "./HospitalEntry.tsx";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry.tsx";
import HealthCheckEntry from "./HealthCheckEntry.tsx";

interface Props {
    entry: PopulatedEntry,
}

const Entry = ({ entry }: Props) => {
  const { type } = entry;

  switch (type) {
  case EntryType.Hospital:
    return <HospitalEntry entry={entry} />;
  case EntryType.OccupationalHealthcare:
    return <OccupationalHealthcareEntry entry={entry} />;
  case EntryType.HealthCheck:
    return <HealthCheckEntry entry={entry} />;
  default:
    assertNever(type);
  }
};

export default Entry;
