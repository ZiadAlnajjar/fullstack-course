import { cliRun } from "./cliHelper";

export const calculateBmi = (weightKg: number, heightCm: number): string => {
    if (heightCm <= 0) throw new Error("Height must be greater than zero");

    const bmi = weightKg / ((heightCm / 100) ** 2);

    switch (true) {
        case bmi < 16.0:
            return "Underweight (Severe thinness)";
        case bmi < 16.9:
            return "Underweight (Moderate thinness)";
        case bmi < 18.4:
            return "Underweight (Mild thinness)";
        case bmi < 24.9:
            return "Normal range";
        case bmi < 29.9:
            return "Overweight (Pre-obese)";
        case bmi < 34.9:
            return "Obese (Class I)";
        case bmi < 39.9:
            return "Obese (Class II)";
        case bmi >= 40.0:
            return "Obese (Class III)";
        default:
            return "Uncategorized BMI";
    }
};

if (require.main === module) {
    cliRun('bmi', calculateBmi);
}
