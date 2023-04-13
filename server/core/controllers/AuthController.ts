import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import {
  addRefreshTokenToWhitelist,
  deleteRefreshToken,
  findRefreshTokenById,
  // revokeTokens,
} from "../../infrastructure/repositories/User/AuthRepository";
import {
  newUserSignIn,
  findUserByEmail,
} from "../../infrastructure/repositories/User/UserRepository";
import { generateTokens } from "../../../pages/api/auth/jwt";
import { ErrorInterface } from "../entities/ErrorInterface";
import prisma from "../../infrastructure/prisma/db/client";
import { validationResult } from "express-validator";

interface JwtPayload {
  userId: number;
  role: "ADMIN" | "USER" | "PRO";
  jti: string;
}

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({ message: errors.array(), status: 400 });
  }
  try {
    const { email, password, name } = req.body;
    const user = await newUserSignIn({ email, password, name });
    if (!user) throw new Error();
    res.status(201).send({ user });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error(
        "L'identifiant ou le mot de passe est manquant."
      ) as ErrorInterface;
      error.status = 400;
      throw error;
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser && existingUser.password) {
      const validPassword = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!validPassword) {
        const error = new Error(
          "L'identifiant ou le mot de passe est incorrect."
        ) as ErrorInterface;
        error.status = 400;
        throw error;
      }
      const jti = uuidv4();
      const { accessToken, refreshToken } = generateTokens(existingUser, jti);
      await addRefreshTokenToWhitelist({
        jti,
        refreshToken,
        userId: existingUser.id,
      });

      res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
        })
        .header("Authorization", accessToken)
        .send({ user: existingUser });
    } else {
      const error = new Error(
        "L'identifiant ou le mot de passe est incorrect."
      ) as ErrorInterface;
      error.status = 400;
      throw error;
    }
  } catch (err) {
    next(err);
  }
};

export const userIsLoggedIn = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.payload;
    const userDetails = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
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
      .send({ user: userDetails });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req: any, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies["refreshToken"];
    const { jti } = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_ACCESS_SECRET as string
    ) as JwtPayload;
    // await revokeTokens(userId);
    if (jti) {
      const savedRefreshToken = await findRefreshTokenById(jti);
      if (savedRefreshToken) {
        await deleteRefreshToken(savedRefreshToken.id);
      }
    }
    res
      .clearCookie("refreshToken", { httpOnly: true })
      .json({ message: "Déconnexion réussie !" });
  } catch (err) {
    next(err);
  }
};

// export const refreshUserToken = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     // const { refreshToken } = req.body;
//     const refreshToken = req.cookies["refreshToken"];

//     if (!refreshToken) {
//       res.status(401);
//       throw new Error("Missing refresh token.");
//     }
//     const payload: any = jwt.verify(
//       refreshToken,
//       process.env.JWT_REFRESH_ACCESS_SECRET as string
//     );

//     console.log("refreshUserToken payload", payload);

//     const savedRefreshToken = await findRefreshTokenById(payload.jti);

//     if (savedRefreshToken && savedRefreshToken.id) {
//       const hashedToken = hash(refreshToken);
//       if (hashedToken !== savedRefreshToken.hashedToken) {
//         res.status(401);
//         throw new Error("Unauthorized");
//       }

//       const user = await findUserById(payload.userId);
//       if (!user) {
//         res.status(401);
//         throw new Error("Unauthorized");
//       }

//       await deleteRefreshToken(savedRefreshToken.id);

//       const jti = uuidv4();
//       const { accessToken, refreshToken: newRefreshToken } = generateTokens(
//         user,
//         jti
//       );

//       await addRefreshTokenToWhitelist({
//         jti,
//         refreshToken: newRefreshToken,
//         userId: user.id,
//       });

//       res
//         .cookie("refreshToken", refreshToken, {
//           httpOnly: true,
//           sameSite: "strict",
//         })
//         .header("Authorization", accessToken)
//         .send(user);
//     } else {
//       res.status(401);
//       throw new Error("Unauthorized");
//     }
//   } catch (err) {
//     next(err);
//   }
// };
