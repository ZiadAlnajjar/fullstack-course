import { Diagnosis } from "../../types.ts";
import { Typography } from "@mui/material";

interface Props {
    diagnoses: Diagnosis[] | undefined;
    specialist: string;
}

const Diagnoses = ({ diagnoses, specialist }: Props) => {
  if (!diagnoses) {
    return <Typography variant='body2'>diagnose by {specialist}</Typography>;
  }

  return (
    <>
      <ul>
        {diagnoses.map(({ code, name }: Diagnosis) => (
          <li key={code}>
            <Typography>{code} {name}</Typography>
          </li>
        ))}
      </ul>
      <Typography variant='body2'>diagnose by {specialist}</Typography>
    </>
  );
};

export default Diagnoses;
