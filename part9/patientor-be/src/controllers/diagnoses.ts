import { Router, Response } from 'express';
import { Diagnosis } from "../types";
import diagnosesService from "../services/diagnoses";

const router = Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
    res.json(diagnosesService.getAll());
});

export default router;
