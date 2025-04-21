import { Router, Request, Response } from 'express';
import { Entry, NewEntry, NewPatient, Patient, PatientPublicEntry, PopulatedEntry, PopulatedPatient } from "../types";
import patientsService from "../services/patients";
import { newEntryParser, newPatientParser } from "../utils/middleware";
import { populateEntry, populatePatient } from "../utils/utils";

const router = Router();

router.get('/', (_req, res: Response<PatientPublicEntry[]>) => {
    res.json(patientsService.getAllPublic());
});

router.get('/:id', (req, res: Response<PopulatedPatient>) => {
    const patient = patientsService.findById(req.params.id);

    if (!patient) {
        res.status(404);
        return;
    }

    const populatedPatient = populatePatient(patient);

    res.send(populatedPatient);
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedEntry: Patient = patientsService.add(req.body);

    res.json(addedEntry);
});

router.post('/:id/entries', newEntryParser, (req: Request<{ id: string }, unknown, NewEntry>, res: Response<PopulatedEntry>) => {
    const patient = patientsService.findById(req.params.id);

    if (!patient) {
        res.status(404);
        return;
    }

    const addedEntry: Entry = patientsService.addEntry(patient, req.body);
    const populatedEntry: PopulatedEntry = populateEntry(addedEntry);

    res.json(populatedEntry);
});

export default router;
