import express from "express";

import {
  login,
  refreshUserToken,
  revokeRefreshToken,
  signIn,
} from "../core/controllers/AuthController";
const authRouter = express.Router();

authRouter.post("/api/register", signIn);
authRouter.post("/api/login", login);
authRouter.post("/api/refreshtoken", refreshUserToken);
authRouter.post("/revokeRefreshTokens", revokeRefreshToken);

export default authRouter;
