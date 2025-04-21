import {cliRun} from "./cliHelper";

interface CalculateExercisesResult {
    periodLength: number;
    trainingDays: number;
    target: number;
    average: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
}

const getScore = (value: number, range: [number, number] = [1, 2]) => Math.max(range[0], Math.min(value, range[1]));

const evaluate = (score: number, target: number): [number, string] => {
    const mark = score / target;

    switch (true) {
        case mark >= 1:
            return [3, 'Excellent'];
        case mark >= 0.8:
            return [2, 'Good'];
        case mark >= 0.6:
            return [1.5, 'Average'];
        case mark >= 0.4:
            return [1.5, 'Below Average'];
        case mark < 0.4:
            return [1, 'Fail'];
        default:
            return [0, 'Uknown Rating'];
    }
};

export const calculateExercises = (target: number, excerciseHours: number[]): CalculateExercisesResult => {
    if (excerciseHours.constructor !== Array) {
        throw new Error('Exercise hours must be an array');
    }

    const periodLength = excerciseHours.length;
    const trainingDays = excerciseHours.filter(hrs => hrs !== 0).length;
    const actualHours = excerciseHours.reduce((acc, curr) => acc + curr);
    const average = actualHours / periodLength;
    const score = getScore(average);
    const success = score >= target;
    const [rating, ratingDescription] = evaluate(score, target);

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

if (require.main === module) {
    cliRun('exercise', calculateExercises);
}
