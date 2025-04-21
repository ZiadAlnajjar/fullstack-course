import {
  Diagnosis,
  EntryType, HealthCheck,
  HealthCheckRating, Hospital,
  NewBaseEntry, OccupationalHealthcare, PatientEntry
} from '../../types';
import { addSpacesToCaps, dateNowISO, enumArr, toNewEntry } from '../../utils';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Alert, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import useField from '../../hooks/useField';
import HealthCheckFields from './HealthCheckFields';
import HospitalFields from './HospitalFields';
import OccupationalHealthcareFields from './OccupationalHealthcareFields';
import useObjectState from '../../hooks/useObjectState';
import patientService from '../../services/patients';
import diagnosesService from '../../services/diagnoses';
import { isAxiosError } from 'axios';

interface Props {
  id: string;
  addEntry: (entry: PatientEntry) => void;
}

const Index = ({ id, addEntry }: Props) => {
  const [open, setOpen] = useState(false);
  const [entryType, resetEntryType] = useField<EntryType>('select');
  const [error, setError] = useState<string>('');

  const {
    state: data,
    ...entry
  } = useObjectState<NewBaseEntry>({
    description: '',
    diagnosisCodes: [],
    specialist: '',
    date: dateNowISO(),
  });

  const healthCheck = useObjectState<HealthCheck>({
    healthCheckRating: HealthCheckRating.HighRisk,
  });

  const occupationalHealthcare = useObjectState<OccupationalHealthcare>({
    employerName: '',
    sickLeave: {
      startDate: '',
      endDate: '',
    }
  });

  const hospital = useObjectState<Hospital>({
    discharge: {
      date: dateNowISO(),
      criteria: '',
    }
  });

  const entryTypes: EntryType[] = useMemo(() => enumArr(EntryType), []);

  const handleOpen = () => setOpen(!open);

  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const createEntry = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const newEntry = toNewEntry(
        entryType.value,
        data,
        healthCheck.state,
        hospital.state,
        occupationalHealthcare.state,
      );
      const addedEntry = await patientService.createEntry(id, newEntry);

      addEntry(addedEntry);
      setOpen(false);
    } catch (e: unknown) {
      let message: string = 'Something went wrong, please try again later!';

      if (isAxiosError(e)) {
        const data = e?.response?.data;
        const dataError = data?.error;

        if (data && typeof data === 'string') {
          message = data;
        } else if (dataError && typeof Array.isArray(dataError)) {
          message = '';
          dataError.forEach(({ message: m }: { message: string }) =>
            message += `\n- ${m}\n`);
        }
      }

      setError(message);
    }
  };

  const handleDiagnosesChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    entry.set({
      diagnosisCodes: typeof value === 'string' ? value.split(',') : value,
    });
  };

  useEffect(() => {
    diagnosesService.getAll().then((result: Diagnosis[]) => {
      setDiagnosisCodes(result.map(({ code }) => code));
    });
  }, []);

  useEffect(() => {
    if (!open) {
      resetEntryType();
      entry.reset();
      occupationalHealthcare.reset();
      healthCheck.reset();
      hospital.reset();
    }
  }, [entry, healthCheck, hospital, occupationalHealthcare, open, resetEntryType]);

  useEffect(() => {
    let alertTimer: number | undefined;

    if (error) {
      alertTimer = setTimeout(() => {
        setError('');
      }, 5 * 1000);
    }

    return () => clearTimeout(alertTimer);
  }, [error]);

  return (
    <div>
      {error && <Alert severity='error' style={{ marginTop: 20 }}>{error}</Alert>}
      <Button onClick={handleOpen} variant='contained' color='secondary' style={{ marginTop: 20 }}>New Entry</Button>
      {open && <form
        onSubmit={createEntry}
        style={{ padding: 20, border: '1px solid #999', marginTop: 20, borderRadius: 6 }}
      >
        <FormControl fullWidth margin='normal'>
          <TextField
            type='date'
            label='Date' onChange={entry.onChange('date')}
            value={data.date}
            required
          />
        </FormControl>
        <FormControl fullWidth margin='normal'>
          <TextField
            label='Description'
            onChange={entry.onChange('description')}
            value={data.description}
            required
          />
        </FormControl>
        <FormControl fullWidth margin='normal'>
          <TextField
            label='Specialist'
            onChange={entry.onChange('specialist')}
            value={data.specialist}
            required
          />
        </FormControl>
        <FormControl fullWidth margin='normal'>
          <InputLabel>Diagnoses</InputLabel>
          <Select
            label='Diagnoses'
            value={data.diagnosisCodes}
            onChange={handleDiagnosesChange}
            multiple
          >
            {diagnosisCodes.map((code) => (
              <MenuItem key={code} value={code}>{code}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin='normal'>
          <InputLabel required>Type</InputLabel>
          <Select
            label='Type'
            value={entryType.value}
            onChange={entryType.onChange}
            required
          >
            {entryTypes.map((type) => (
              <MenuItem key={type} value={type}>{addSpacesToCaps(type)}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <>
          {entryType.value === EntryType.HealthCheck
                    && <HealthCheckFields fields={healthCheck} />}
          {entryType.value === EntryType.Hospital
                    && <HospitalFields fields={hospital} />}
          {entryType.value === EntryType.OccupationalHealthcare
                    && <OccupationalHealthcareFields fields={occupationalHealthcare} />}
        </>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={() => setOpen(false)} color='error'>Cancel</Button>
          <Button type='submit' variant='contained'>Add</Button>
        </div>
      </form>}
    </div>
  );
};

export default Index;
