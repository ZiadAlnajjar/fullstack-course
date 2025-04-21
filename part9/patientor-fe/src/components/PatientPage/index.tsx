import { PathMatch, useMatch } from "react-router-dom";
import patientsService from '../../services/patients.ts';
import { Patient, PopulatedEntry, PopulatedPatient } from "../../types.ts";
import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { Typography } from "@mui/material";
import {
  Male as MaleIcon,
  Female as FemaleIcon, SvgIconComponent,
} from '@mui/icons-material';
import Entries from "./Entries.tsx";
import './index.css';
import NewEntryForm from "../NewEntryForm";

const PatientPage = () => {
  const match: PathMatch<'id'> | null = useMatch('/patient/:id');
  const patientId: string | undefined = match?.params.id;
  const [patient, setPatient] = useState<PopulatedPatient | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const addEntry = (entry: PopulatedEntry) => {
    if (!patient) return;

    setPatient({
      ...patient,
      entries: [
        ...patient.entries,
        entry,
      ]
    });
  };

  useEffect(() => {
    if (!patientId) return;

    setLoading(true);
    patientsService.get(patientId)
      .then((res: Patient) => {
        setPatient(res);
        setError(null);
      })
      .catch((e: unknown) => {
        let message: string = 'Something went wrong, please try again later!';

        if (isAxiosError(e)) {
          if (e?.response?.data && typeof e?.response?.data === "string") {
            message = e.response.data;
          }
        }

        setPatient(null);
        setError(message);
      })
      .finally(() => setLoading(false));
  }, [patientId]);

  if (loading) return <p>loading...</p>;
  if (error) return <p>{error}</p>;
  if (!patient) return <p>Patient not found</p>;

  const GenderIcon: SvgIconComponent =
        patient.gender === 'male'
          ? MaleIcon
          : FemaleIcon;

  return (
    <div>
      <NewEntryForm id={patient.id} addEntry={addEntry} />
      <Typography variant='h4' className='title'>
        {patient.name}
        <GenderIcon fontSize='large' />
      </Typography>
      <Typography>ssn: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>
      <Entries entries={patient.entries} />
    </div>
  );
};

export default PatientPage;
