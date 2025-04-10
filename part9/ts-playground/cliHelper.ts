import {
    Operation,
    BmiArgs,
    ExerciseArgs,
    GenericCallback,
} from "./types";

const parseArguments = (operation: Operation): BmiArgs | ExerciseArgs => {
    const args = process.argv.slice(2);

    switch (operation) {
        case 'bmi': {
            if (args.length !== 2) throw new Error('Invalid number of arguments.');
            const [weight, height] = args.map(Number);
            if (isNaN(weight) || isNaN(height)) throw new Error('Both arguments must be numbers.');
            return [weight, height];
        }

        case 'exercise': {
            if (args.length < 2) throw new Error('Invalid number of arguments');
            const [target, ...hours] = args.map((arg) => {
                const sanitizedArg = Number(arg);
                if (isNaN(sanitizedArg)) throw new Error('All arguments must be numbers.');
                return sanitizedArg;
            });
            return [target, hours];
        }

        default:
            throw new Error('Invalid operation passed.');
    }
};

export const cliRun = (
    operation: Operation,
    callBack: GenericCallback<unknown[]>,
) => {
    try {
        const args = parseArguments(operation);
        console.log(callBack(...args));
    } catch (error: unknown) {
        let errorMessage = 'Something bad happened.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
    }
};
