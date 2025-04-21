import { FormControl, InputLabel, TextField, Typography } from "@mui/material";
import { ChangeEvent } from "react";
import { UseObjectStateReturn } from "../../hooks/useObjectState.ts";
import { OccupationalHealthcare } from "../../types.ts";

interface Props {
    fields: UseObjectStateReturn<OccupationalHealthcare>
}

const OccupationalHealthcareFields = ({ fields }: Props) => {
  const updateSickLeave = (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
    fields.set({
      [key]: e.target.value,
    }, 'sickLeave');
  };

  return (
    <>
      <FormControl fullWidth margin='normal'>
        <TextField
          label='Employer Name'
          onChange={fields.onChange('employerName')}
          value={fields.state.employerName}
          required
        />
      </FormControl>
      <Typography variant='h6'>Sick Leave</Typography>
      <FormControl fullWidth margin='normal'>
        <InputLabel shrink style={{ background: 'white' }}>Start Date</InputLabel>
        <TextField
          type='date'
          onChange={updateSickLeave('startDate')}
          value={fields.state.sickLeave?.startDate}
        />
      </FormControl>
      <FormControl fullWidth margin='normal'>
        <InputLabel shrink style={{ background: 'white' }}>End Date</InputLabel>
        <TextField
          type='date'
          onChange={updateSickLeave('endDate')}
          value={fields.state.sickLeave?.endDate}
        />
      </FormControl>
    </>
  );
};

export default OccupationalHealthcareFields;
