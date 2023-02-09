import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import next from "next";
import swaggerUI from "swagger-ui-express";

import Store from "./routes/store";
import flowRouter from "./routes/flow.routes";
import documentation from "./documentation";
import prisma from "./prisma/db/client";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const store = new Store();

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    server.get("/api/todo", (req: Request, res: Response) => {
      console.log("todo");
      return res.send({ todo: store.todoList });
    });

    server.get("/api/users", async (req, res) => {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          posts: true
        },
      });
      res.json(users);
    });

    server.use(flowRouter);

    server.use(
      "/api_documentation",
      swaggerUI.serve,
      swaggerUI.setup(documentation, { explorer: true })
    );

    server.get("/api/todo/:id", (req: Request, res: Response) => {
      const id = req.params.id;
      return res.send(store.get(id));
    });

    server.post("/api/todo/new", (req: Request, res: Response) => {
      const entity = req.body;
      return res.send(store.add(entity));
    });

    server.put("/api/todo/:id", (req: Request, res: Response) => {
      const id = req.params.id;
      const entity = req.body;
      return res.send(store.update(id, entity));
    });

    server.delete("/api/todo/:id", (req: Request, res: Response) => {
      const id = req.params.id;
      return res.send(store.delete(id));
    });

    server.get("*", (req: Request, res: Response) => {
      return handle(req, res);
    });

    server.listen(3000, (err?: any) => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    process.exit(1);
  });
