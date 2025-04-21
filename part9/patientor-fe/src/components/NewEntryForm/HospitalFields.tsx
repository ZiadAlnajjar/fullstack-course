import { FormControl, TextField, Typography } from "@mui/material";
import { ChangeEvent } from "react";
import { UseObjectStateReturn } from "../../hooks/useObjectState.ts";
import { Hospital } from "../../types.ts";

interface Props {
    fields: UseObjectStateReturn<Hospital>
}

const HospitalFields = ({ fields }: Props) => {
  const updateDischarge = (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
    fields.set({
      discharge: {
        ...fields.state.discharge,
        [key]: e.target.value,
      }
    });
  };

  return (
    <>
      <Typography variant='h6'>Discharge</Typography>
      <FormControl fullWidth margin='normal'>
        <TextField
          type='date'
          label='Date'
          onChange={updateDischarge('date')}
          value={fields.state.discharge.date}
          required
        />
      </FormControl>
      <FormControl fullWidth margin='normal'>
        <TextField
          label='Criteria'
          onChange={updateDischarge('criteria')}
          value={fields.state.discharge.criteria}
          required
        />
      </FormControl>
    </>
  );
};

export default HospitalFields;
