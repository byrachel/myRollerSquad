import express from "express";
import { isAuthenticated } from "../infrastructure/middleware/isAuthenticated";
import prisma from "../infrastructure/prisma/db/client";

import {
  login,
  logout,
  // refreshUserToken,
  signIn,
} from "../core/controllers/AuthController";

const authRouter = express.Router();

authRouter.post("/api/register", signIn);
authRouter.post("/api/login", login);
authRouter.post("/api/logout", logout);
// authRouter.post("/api/refreshtoken", refreshUserToken);
// authRouter.post("/revokeRefreshTokens", revokeRefreshToken);

authRouter.get(
  "/api/islogged",
  isAuthenticated,
  async (req: any, res, next) => {
    try {
      const { userId } = req.payload;

      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          name: true,
          role: true,
        },
      });

      const accessToken = req.headers.authorization;
      const refreshToken = req.cookies.refreshToken;

      res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
        })
        .header("Authorization", accessToken)
        .status(200)
        .send({ user: user });
    } catch (err) {
      next(err);
    }
  }
);

authRouter.get("/api/user", isAuthenticated, async (req: any, res, next) => {
  try {
    const { userId } = req.payload;
    console.log("USER ID", userId);

    const userDetails = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        role: true,
        avatar: true,
        profile: true,
        email: true,
        country: true,
        city: true,
        posts: true,
      },
    });

    console.log("USER DETAILS", userDetails);

    const accessToken = req.headers.authorization;
    const refreshToken = req.cookies.refreshToken;

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
      })
      .header("Authorization", accessToken)
      .status(200)
      .send({ user: userDetails });
  } catch (err) {
    next(err);
  }
});

export default authRouter;
