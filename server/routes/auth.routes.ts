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

import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

authRouter.post(
  "/api/avatar",
  isAuthenticated,
  upload.single("avatar"),
  (req: any, res: any) => {
    if (!req.file) return res.status(417);
    const buffer = req.file.buffer;

    sharp(buffer)
      .resize(250, 250)
      .toBuffer((err, data, info) => {
        if (err) {
          console.error("Failed to resize image:", err);
          res.status(417).send("Failed to resize image");
          return;
        }
        console.log("Image resized successfully:", info);

        const params = {
          Bucket: process.env.S3_BUCKET_NAME ? process.env.S3_BUCKET_NAME : "",
          Key: `resized-${req.file.originalname}`,
          Body: data,
          ContentType: req.file.mimetype,
        };
        s3.upload(params, async (err: any, data: any) => {
          if (err) {
            console.error("Failed to upload image to S3:", err);
            res.status(500).send("Failed to upload image to S3");
            return;
          }
          console.log("Image uploaded to S3 successfully:", data.Location);

          const { userId } = req.payload;
          if (!userId) return res.status(417);
          const user = await prisma.user.update({
            where: {
              id: userId,
            },
            data: {
              avatar: data.Location,
            },
          });
          res.status(200).json({ user: user });
        });
      });
  }
);

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
