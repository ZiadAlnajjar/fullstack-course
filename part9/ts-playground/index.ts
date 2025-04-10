import express from 'express';
import { calculateBmi } from "./bmiCalculator";
import { hasNaNs, areNumbers, hasProps, isArray } from "./utils";
import { Error } from "./types";
import { calculateExercises } from "./exerciseCalculator";
const { BAD_REQUEST, UNPROCESSABLE_ENTITY } = Error;
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const query = req.query;

    if (!hasProps(query, ['weight', 'height'])) {
        res.status(UNPROCESSABLE_ENTITY.status).send(UNPROCESSABLE_ENTITY.message);
        return;
    }

    const weight = Number(query.weight);
    const height = Number(query.height);

    if (hasNaNs([weight, height])) {
        res.status(BAD_REQUEST.status).send(BAD_REQUEST.message);
        return;
    }

    const data = {
        weight,
        height,
        bmi: calculateBmi(weight, height),
    };

    res.status(200).send(data);
});

app.post('/exercises', (req, res) => {
    const body = req.body as Record<string, unknown>;

    if (!hasProps(body, ['target', 'daily_exercises'])) {
        res.status(UNPROCESSABLE_ENTITY.status).send(UNPROCESSABLE_ENTITY.message);
        return;
    }

    const target = Number(body.target);
    const daily_exercises = body.daily_exercises;

    if (
        isNaN(target)
        || !isArray(daily_exercises)
        || !areNumbers(daily_exercises)
        || hasNaNs(daily_exercises)
    ) {
        res.status(BAD_REQUEST.status).send(BAD_REQUEST.message);
        return;
    }

    const exerciseData = calculateExercises(target, daily_exercises);

    res.status(200).json(exerciseData);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
