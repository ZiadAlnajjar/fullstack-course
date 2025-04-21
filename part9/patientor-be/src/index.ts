import express from 'express';
import cors from 'cors';
import { Request } from "express";
import patientsRouter from "./controllers/patients";
import diagnosesRouter from "./controllers/diagnoses";
import middleware from './utils/middleware';

const app = express();

app.use(cors<Request>());
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.use('/api/patients', patientsRouter);
app.use('/api/diagnoses', diagnosesRouter);

app.use(middleware.errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
