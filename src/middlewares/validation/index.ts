import { NextFunction, Request, Response } from "express";
import { AnySchema, ValidationError } from "yup";

const validateSchema =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (err) {
      const error = err as ValidationError;
      return res.status(400).json(error.errors);
    }
  };

export default validateSchema;
