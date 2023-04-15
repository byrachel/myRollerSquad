import { NextApiRequest } from "next";

export interface ExtendedRequest extends NextApiRequest {
  user: number;
  file?: any;
  user_id?: number;
}
