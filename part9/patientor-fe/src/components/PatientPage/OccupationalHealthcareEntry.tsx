import { POccupationalHealthcareEntry, PopulatedEntry } from "../../types.ts";
import { Typography } from "@mui/material";
import Diagnoses from "./Diagnoses.tsx";
import WorkIcon from '@mui/icons-material/Work';
import SickIcon from '@mui/icons-material/Sick';

interface Props {
    entry: PopulatedEntry<POccupationalHealthcareEntry>;
}

const OccupationalHealthcareEntry = ({
  entry: {
    date,
    description,
    diagnoses,
    specialist,
    employerName,
    sickLeave,
  },
}: Props) =>
  (
    <div>
      <Typography>
        {date} <WorkIcon/> {employerName}
      </Typography>
      <Typography variant='body2'>{description}</Typography>
      {sickLeave
                && <div>
                  <Typography>Sick Leave <SickIcon/></Typography>
                  {sickLeave.startDate} - {sickLeave.endDate}
                </div>}
      <Diagnoses diagnoses={diagnoses} specialist={specialist}/>
    </div>
  );

export default OccupationalHealthcareEntry;
