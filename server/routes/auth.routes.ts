import express from "express";
import { isAuthenticated } from "../infrastructure/middleware/isAuthenticated";
// import multer from "../infrastructure/middleware/multer-config";
import multer from "multer";

import {
  login,
  refreshUserToken,
  signIn,
} from "../core/controllers/AuthController";
import prisma from "../infrastructure/prisma/db/client";
import sharp from "sharp";
const authRouter = express.Router();

authRouter.post("/api/register", signIn);
authRouter.post("/api/login", login);
authRouter.post("/api/refreshtoken", refreshUserToken);
// authRouter.post("/revokeRefreshTokens", revokeRefreshToken);

const upload = multer({ storage: multer.memoryStorage() });

authRouter.post(
  "/upload",
  isAuthenticated,
  upload.single("avatar"),
  (req: any, res: any) => {
    if (!req.file) return res.status(417);
    const buffer = req.file.buffer;

    sharp(buffer)
      .resize(250, 250)
      .toFile("public/uploads/" + req.file.originalname, async (err, info) => {
        if (err) return res.status(417);
        const { userId } = req.payload;
        if (!userId) return res.status(417);
        const user = await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            avatar: req.file.originalname,
          },
        });
        res.json({ user: user });
      });
  }
);

// authRouter.post(
//   "/api/avatar",
//   isAuthenticated,
//   multer.single("avatar"),
//   async (req: any, res: any, next) => {
//     try {
//       const { userId } = req.payload;

//       const file = req.file;
//       if (!file) {
//         res.status(417);
//       }

//       const user = await prisma.user.update({
//         where: {
//           id: userId,
//         },
//         data: {
//           avatar: file.filename,
//         },
//       });
//       console.log(user);
//       res.json({ user: user });
//     } catch (err) {
//       next(err);
//     }
//   }
// );

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
        profile: true,
      },
    });
    res.json({ user: user });
  } catch (err) {
    next(err);
  }
});

export default authRouter;
