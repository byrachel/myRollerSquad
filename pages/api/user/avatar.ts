import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import sharp from "sharp";

import prisma from "@/server/prisma/db/client";
import { uploadImage } from "@/server/utils/uploadImage";
import { E1, E2 } from "src/constants/ErrorMessages";
import { exclude } from "@/server/utils/prismaExclude";
import { checkUserId } from "@/server/controllers/checkUserId";

const upload = multer({
  storage: multer.memoryStorage(),
});

function runMiddleware(
  req: NextApiRequest & { [key: string]: any },
  res: NextApiResponse,
  fn: (...args: any[]) => void
): Promise<any> {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req: any, res: NextApiResponse) {
  if (req.method !== "PUT") return res.status(401).json({ message: E1 });

  const userConnected = await checkUserId(req, res);
  if (!userConnected) return res.status(400).json({ message: E1 });

  try {
    await runMiddleware(req, res, upload.single("avatar"));
    const { buffer } = req.file;

    const resizedBuffer = await sharp(buffer)
      .resize({ width: 200, height: 200 })
      .toBuffer();

    if (!resizedBuffer || !process.env.S3_AVATAR_BUCKET_NAME)
      return res.status(401).json({ message: E2 });
    const avatar = await uploadImage(
      process.env.S3_AVATAR_BUCKET_NAME,
      resizedBuffer
    );

    if (!avatar || !avatar.Key) return res.status(401).json({ message: E1 });

    const user = await prisma.user.update({
      where: {
        id: userConnected.id,
      },
      data: {
        avatar: avatar.Key,
      },
    });
    const userWithoutPassword = exclude(user, ["password"]);

    res.status(200).json({ user: userWithoutPassword });
  } catch (e) {
    return res.status(401).json({ message: E1 });
  }
}

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
