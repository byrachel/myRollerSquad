import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { NextFunction, Request, Response } from "express";
import {
  addRefreshTokenToWhitelist,
  deleteRefreshToken,
  findRefreshTokenById,
  revokeTokens,
} from "../../infrastructure/repositories/User/AuthRepository";
import {
  newUserSignIn,
  findUserByEmail,
  findUserById,
} from "../../infrastructure/repositories/User/UserRepository";
import { generateTokens } from "../../infrastructure/middleware/jwt";

interface ResponseError extends Error {
  status?: number;
}

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      let error = new Error(
        "Une erreur s'est produite. Veuillez vérifier que tous les champs obligatoires soient bien saisis."
      ) as ResponseError;
      error.status = 400;
      throw error;
    }
    const user = await newUserSignIn({ email, password, name });
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
      let error = new Error(
        "L'identifiant ou le mot de passe est manquant."
      ) as ResponseError;
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
        let error = new Error(
          "L'identifiant ou le mot de passe est incorrect."
        ) as ResponseError;
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
      let error = new Error(
        "L'identifiant ou le mot de passe est incorrect."
      ) as ResponseError;
      error.status = 400;
      throw error;
    }
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

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.body;
  if (!userId) {
    let error = new Error("Une erreur s'est produite.") as ResponseError;
    error.status = 400;
    throw error;
  }
  try {
    await revokeTokens(userId);
    res
      .clearCookie("refreshToken", { httpOnly: true })
      .json({ message: "Déconnexion réussie !" });
  } catch (err) {
    next(err);
  }
};
