import type { NextApiResponse } from "next";
import multer from "multer";
import nextConnect from "next-connect";
import sharp from "sharp";

import prisma from "../../../server/infrastructure/prisma/db/client";
import { ExtendedRequest } from "../interfaces/ApiInterfaces";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { uploadImage } from "../utlis/uploadImage";

const upload = multer({
  storage: multer.memoryStorage(),
});

const handler = nextConnect<ExtendedRequest, NextApiResponse>();

handler.use(isAuthenticated);
handler.use(upload.single("avatar"));

handler.put(async (req, res) => {
  const { userId } = req.body;
  const userFromToken = req.user;

  if (parseInt(userId) !== userFromToken)
    return res.status(401).json({ error: "Unauthorized" });

  try {
    const file = req.file;

    if (!file || !process.env.S3_AVATAR_BUCKET_NAME)
      return new Error("No file");

    const buffer = await sharp(file.buffer)
      .resize({ width: 200, height: 200 })
      .toBuffer();
    file.buffer = buffer;

    const avatar = await uploadImage(process.env.S3_AVATAR_BUCKET_NAME, file);

    if (!avatar || !avatar.Key) return new Error("No file");

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
    res.status(500).json({ error: "Failed to upload file" });
  }
});

export default handler;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
