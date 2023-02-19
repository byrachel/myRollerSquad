import next from "next";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import swaggerUI from "swagger-ui-express";

import adminRouter from "./core/routes/admin.routes";
import flowRouter from "./core/routes/flow.routes";
import documentation from "./documentation";
import prisma from "./infrastructure/prisma/db/client";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    server.get("/api/users", async (req, res) => {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          posts: true,
        },
      });
      res.json(users);
    });

    server.post("/api/user", async (req, res) => {
      const { email, name } = req.body;
      const result = await prisma.user.create({
        data: {
          email,
          name,
        },
      });
      return res.status(200).json(result);
    });

    server.use(flowRouter);
    server.use(adminRouter);

    server.use(
      "/api_documentation",
      swaggerUI.serve,
      swaggerUI.setup(documentation, { explorer: true })
    );

    server.get("*", (req: Request, res: Response) => {
      return handle(req, res);
    });

    server.listen(3000, (err?: any) => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => process.exit(1));
