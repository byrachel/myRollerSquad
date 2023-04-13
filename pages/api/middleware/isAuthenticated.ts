import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

const isAuthenticated = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: any
) => {
  if (!req.headers.authorization) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    console.log("header", req.headers.authorization);
    const accessToken = req.headers.authorization.split(" ")[1];

    // const { authorization } = req.headers;
    // const accessToken = authorization?.split(" ")[1];
    const refreshToken = req.cookies["refreshToken"];

    console.log("cookie", req.cookies);

    console.log("a", accessToken);
    console.log("b", refreshToken);

    next();
  }
};

const handler = nextConnect<NextApiRequest, NextApiResponse>();

// handler.use(isAuthenticated);

// handler.get((req: NextApiRequest, res: NextApiResponse) => {
//   res.json({ message: "You are authenticated" });
// });

const get = (middleware: any) => {
  //   console.log("middleware", middleware);
  return nextConnect().post(middleware);
};

export default handler;
export { isAuthenticated, get };
