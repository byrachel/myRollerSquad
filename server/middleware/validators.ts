import { check, validationResult } from "express-validator";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

const initValidation = (validations: any) => {
  //   console.log("validations", validations);
  return async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    await Promise.all(
      validations.map((validation: any) => validation.run(req))
    );
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    const error: any[] = [];
    console.log("error", error);
    errors.array().map(err => error.push(err.msg));

    res.status(400).json({ success: false, data: null, error: error });
  };
};

const post = (middleware: any) => {
  //   console.log("middleware", middleware);
  return nextConnect().post(middleware);
};

const put = (middleware: any) => {
  //   console.log("middleware", middleware);
  return nextConnect().put(middleware);
};

// u can set onError , onNoMatch and global middleware or etc
//  handler = nextConnect({ onError, onNoMatch }).use(SOME_MIDDLEWARE)
const handler = nextConnect<NextApiRequest, NextApiResponse>();
export default handler;
export { initValidation, post, put, check };
