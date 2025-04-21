import { PHospitalEntry, PopulatedEntry } from "../../types.ts";
import { Typography } from "@mui/material";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Diagnoses from "./Diagnoses.tsx";
import LogoutIcon from '@mui/icons-material/Logout';

interface Props {
    entry: PopulatedEntry<PHospitalEntry>;
}

const HospitalEntry = ({
  entry: {
    date,
    description,
    diagnoses,
    specialist,
    discharge,
  },
}: Props) => {
  return (
    <div>
      <Typography>
        {date} <LocalHospitalIcon />
      </Typography>
      <Typography variant='body2'>{description}</Typography>
      <Typography>Discharge <LogoutIcon /></Typography>
      <Typography>{discharge.date}: {discharge.criteria}</Typography>
      <Diagnoses diagnoses={diagnoses} specialist={specialist} />
    </div>
  );
};

export default HospitalEntry;
