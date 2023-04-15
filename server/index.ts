import next from "next";
import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import adminRouter from "./routes/admin.routes";
import flowRouter from "./routes/flow.routes";
import prisma from "./infrastructure/prisma/db/client";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";

const dev = process.env.NODE_ENV !== "production";
const hostname = dev ? "localhost" : process.env.HOSTNAME;
const port = 3000;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(cookieParser());
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    // PRODUCTION CONFIG
    server.use((req, res, next) => {
      res.setHeader("Cache-Control", "max-age=31536000, public");
      next();
    });
    //

    server.get("/api/users", async (req, res) => {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          posts: true,
          role: true,
          rgpd: true,
          avatar: true,
        },
      });
      res.json(users);
    });

    server.use(flowRouter);
    server.use(adminRouter);
    server.use(authRouter);
    server.use(userRouter);

    server.use(
      (error: any, req: Request, res: Response, next: NextFunction) => {
        console.log("ERROR HANDLER >> ", error);
        console.log("NEXT >> ", next);
        const status = error.status || 500;
        res.status(status).send({ message: error.message });
      }
    );

    server.get("*", (req: Request, res: Response) => {
      return handle(req, res);
    });

    server.use(express.static("public"));

    const PORT = process.env.PORT || 3000;

    server.listen(PORT, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on ${PORT}`);
    });
  })
  .catch(() => process.exit(1));
