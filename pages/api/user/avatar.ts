import type { NextApiResponse } from "next";
import multer from "multer";
import nextConnect from "next-connect";
import sharp from "sharp";

import prisma from "../../../server/prisma/db/client";
import { ExtendedRequest } from "../../../server/interfaces/ApiInterfaces";
import { isAuthenticated } from "../../../server/middleware/isAuthenticated";
import { uploadImage } from "../../../server/utils/uploadImage";
import { E1, E2 } from "app/constants/ErrorMessages";

const upload = multer({
  storage: multer.memoryStorage(),
});

const handler = nextConnect<ExtendedRequest, NextApiResponse>();

handler.use(isAuthenticated);
handler.use(upload.single("avatar"));

handler.put(async (req, res) => {
  const { userId } = req.body;
  const userFromToken = req.user;

  if (userId || !userFromToken || parseInt(userId) !== userFromToken)
    return res.status(401).json({ code: E2 });

  const file = req.file;
  if (!file || !process.env.S3_AVATAR_BUCKET_NAME)
    return res.status(401).json({ code: E1 });

  try {
    const buffer = await sharp(file.buffer)
      .resize({ width: 200, height: 200 })
      .toBuffer();
    file.buffer = buffer;

    const avatar = await uploadImage(process.env.S3_AVATAR_BUCKET_NAME, file);

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
  } catch (error) {
    console.error(error);
    res.status(400).json({ code: E1 });
  }
});

export default handler;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
