import { Request, Response, NextFunction } from 'express';
import { NewEntrySchema, NewPatientSchema } from "./utils";
import { z } from "zod";

export const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        req.body = NewPatientSchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

export const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        req.body = NewEntrySchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

export const errorHandler = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues });
    } else {
        next(error);
    }
};

export default {
    newPatientParser,
    errorHandler,
};
