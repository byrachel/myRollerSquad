import type { NextApiResponse } from "next";
import multer from "multer";
import nextConnect from "next-connect";
import sharp from "sharp";

import prisma from "../../../server/prisma/db/client";
import { ExtendedRequest } from "../../../server/interfaces/ApiInterfaces";
import { isAuthenticated } from "../../../server/middleware/isAuthenticated";
import { uploadImage } from "../../../server/utils/uploadImage";
import { E1, E2 } from "app/constants/ErrorMessages";

import { withIronSessionApiRoute } from "iron-session/next";
import { ironConfig } from "app/utils/ironConfig";

const upload = multer({
  storage: multer.memoryStorage(),
});
const avatarUpload = upload.single("avatar");

// const handler = nextConnect<ExtendedRequest, NextApiResponse>();

export default withIronSessionApiRoute(avatarRoute, ironConfig);

async function avatarRoute(req: any, res: any) {
  const user = req.session.user;
  if (!user) return res.status(401).json({ code: E2 });

  try {
    avatarUpload(req, res, async err => {
      if (err) return res.status(401).json({ code: E2 });

      const { buffer } = req.file;

      const resizedBuffer = await sharp(buffer)
        .resize({ width: 200, height: 200 })
        .toBuffer();

      if (!resizedBuffer || !process.env.S3_AVATAR_BUCKET_NAME)
        return res.status(401).json({ code: E2 });
      const avatar = await uploadImage(
        process.env.S3_AVATAR_BUCKET_NAME,
        resizedBuffer
      );

      if (!avatar || !avatar.Key) return res.status(401).json({ code: E1 });

      const user = await prisma.user.update({
        where: {
          id: req.user,
        },
        data: {
          avatar: avatar.Key,
        },
      });

      res.status(200).json({ user });
    });
  } catch (e) {
    console.log("avatar", e);
    return res.status(401).json({ code: E1 });
  }
}

// handler.use(isAuthenticated);
// handler.use(upload.single("avatar"));

// handler.put(async (req, res) => {
//   const { user_id } = req.body;
//   const userFromToken = req.user;

//   if (!user_id || !userFromToken || parseInt(user_id) !== userFromToken)
//     return res.status(401).json({ code: E2 });

//   const file = req.file;
//   if (!file || !process.env.S3_AVATAR_BUCKET_NAME)
//     return res.status(401).json({ code: E1 });

//   try {
//     const buffer = await sharp(file.buffer)
//       .resize({ width: 200, height: 200 })
//       .toBuffer();
//     file.buffer = buffer;

//     const avatar = await uploadImage(process.env.S3_AVATAR_BUCKET_NAME, file);

//     if (!avatar || !avatar.Key) return res.status(401).json({ code: E1 });

//     const user = await prisma.user.update({
//       where: {
//         id: req.user,
//       },
//       data: {
//         avatar: avatar.Key,
//       },
//     });

//     res.status(200).json({ user });
//   } catch (error) {
//     console.error("AVATAR", error);
//     res.status(400).json({ code: E1 });
//   }
// });

// export default handler;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
