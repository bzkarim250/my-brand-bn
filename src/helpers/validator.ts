import { Response, NextFunction } from "express";
import response from "./response";
import { Schema } from "joi";

const validateSchema = <T>(schema: Schema, toValidate: T, res: Response, next: NextFunction) => {
  const { error } = schema.validate(toValidate);
  return error
    ? response(res, 422, error.message, null, "VALIDATION_ERROR")
    : next();
};

export default validateSchema;
