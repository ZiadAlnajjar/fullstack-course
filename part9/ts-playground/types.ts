export type Operation = 'bmi' | 'exercise';

export type BmiArgs = [weightKg: number, heightCm: number];

export type ExerciseArgs = [target: number, hours: number[]];

export type GenericCallback <TArgs extends unknown[], TResult = void> = (...args: TArgs) => TResult;

export type CalcBmiCallback = GenericCallback<BmiArgs, void>;

export type CalcExercisesCallback = GenericCallback<ExerciseArgs, void>;

export const Error = {
    UNPROCESSABLE_ENTITY: { code: 'UNPROCESSABLE_ENTITY', message: 'Missing request data', status: 422 },
    BAD_REQUEST: { code: 'BAD_REQUEST', message: 'Malformed request data', status: 400 },
    NOT_FOUND: { code: "NOT_FOUND", message: "Resource not found", status: 404 },
    UNAUTHORIZED: { code: "UNAUTHORIZED", message: "Unauthorized access", status: 401 },
    SERVER_ERROR: { code: "SERVER_ERROR", message: "Internal server error", status: 500 },
};

export type ErrorType = keyof typeof Error;
