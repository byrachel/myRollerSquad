import express from "express";
import { isAuthenticated } from "../infrastructure/middleware/isAuthenticated";
import {
  login,
  logout,
  signIn,
  userIsLoggedIn,
} from "../core/controllers/AuthController";

const authRouter = express.Router();

authRouter.post("/api/register", signIn);
authRouter.post("/api/login", login);
authRouter.post("/api/logout", logout);
authRouter.get("/api/user", isAuthenticated, userIsLoggedIn);

export default authRouter;
