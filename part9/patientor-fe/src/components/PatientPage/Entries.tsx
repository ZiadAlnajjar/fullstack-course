import { PatientEntry } from "../../types.ts";
import { Typography } from "@mui/material";
import Entry from "./Entry.tsx";

interface Props {
    entries: PatientEntry[];
}

const Entries = ({ entries }: Props) => {
  return (
    <div>
      <Typography variant='h5' className='title'>entries</Typography>
      {entries.map((entry) => (
        <div className='entry' key={entry.id}>
          <Entry entry={entry} />
        </div>
      ))}
    </div>
  );
};

export default Entries;
