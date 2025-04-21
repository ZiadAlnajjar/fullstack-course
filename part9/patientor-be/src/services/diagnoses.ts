import diagnoses from "../../data/diagnoses";
import { Diagnosis } from "../types";

const getAll = (): Diagnosis[] => diagnoses;

const findByCode = (code: string): Diagnosis | undefined => {
    return diagnoses.find(p => p.code === code);
};

export default {
    getAll,
    findByCode,
};
