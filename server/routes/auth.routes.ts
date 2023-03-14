import express from "express";
import { isAuthenticated } from "../infrastructure/utils/isAuthenticated";

import {
  login,
  refreshUserToken,
  revokeRefreshToken,
  signIn,
} from "../core/controllers/AuthController";
import prisma from "../infrastructure/prisma/db/client";
const authRouter = express.Router();

authRouter.post("/api/register", signIn);
authRouter.post("/api/login", login);
authRouter.post("/api/refreshtoken", refreshUserToken);
authRouter.post("/revokeRefreshTokens", revokeRefreshToken);

authRouter.get("/api/profile", isAuthenticated, async (req: any, res, next) => {
  try {
    const { userId } = req.payload;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        createdAt: true,
      },
    });
    res.json({ user: user });
  } catch (err) {
    next(err);
  }
});

export default authRouter;
