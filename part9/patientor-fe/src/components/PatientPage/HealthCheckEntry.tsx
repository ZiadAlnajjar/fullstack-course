import { HealthCheckRating, PHealthCheckEntry, PopulatedEntry } from "../../types.ts";
import { Typography } from "@mui/material";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import Diagnoses from "./Diagnoses.tsx";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { assertNever } from "../../utils.ts";

interface Props {
    entry: PopulatedEntry<PHealthCheckEntry>;
}

const HealthCheckEntry = ({
  entry: {
    date, description, diagnoses, specialist, healthCheckRating,
  },
}: Props) => {
  let heartColor = '';

  switch (healthCheckRating) {
  case HealthCheckRating.Healthy:
    heartColor = 'green';
    break;
  case HealthCheckRating.LowRisk:
    heartColor = 'yellow';
    break;
  case HealthCheckRating.HighRisk:
    heartColor = 'orange';
    break;
  case HealthCheckRating.CriticalRisk:
    heartColor = 'red';
    break;
  default:
    assertNever(healthCheckRating);
  }

  return (
    <div>
      <Typography>
        {date} <MedicalServicesIcon />
      </Typography>
      <Typography variant='body2'>{description}</Typography>
      <FavoriteIcon htmlColor={heartColor} />
      <Diagnoses diagnoses={diagnoses} specialist={specialist} />
    </div>
  );
};

export default HealthCheckEntry;
