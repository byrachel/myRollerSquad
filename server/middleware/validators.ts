import { check, validationResult } from "express-validator";
import { NextApiRequest, NextApiResponse } from "next";

const initValidation = (validations: any) => {
  return async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    await Promise.all(
      validations.map((validation: any) => validation.run(req))
    );
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    const error: any[] = [];
    errors.array().map((err) => error.push(err.msg));
    res.status(400).json({ message: error[0] });
  };
};

export { initValidation, check };
