import { NextApiRequest } from "next";

export interface ExtendedRequest extends NextApiRequest {
  user: number;
}
