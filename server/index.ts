import next from "next";
import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import swaggerUI from "swagger-ui-express";

import adminRouter from "./routes/admin.routes";
import flowRouter from "./routes/flow.routes";
import documentation from "./documentation";
import prisma from "./infrastructure/prisma/db/client";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(cookieParser());
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

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
      "/api_documentation",
      swaggerUI.serve,
      swaggerUI.setup(documentation, { explorer: true })
    );

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

    server.listen(3000, (err?: any) => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(() => process.exit(1));
