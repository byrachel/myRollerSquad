import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import nextConnect from "next-connect";
import multer from "multer";
import sharp from "sharp";

import prisma from "../../../server/prisma/db/client";
import { uploadImage } from "../../../server/utils/uploadImage";
import { E1, E2 } from "src/constants/ErrorMessages";
import { ironConfig } from "@/server/middleware/auth/ironConfig";
import { exclude } from "@/server/utils/prismaExclude";

const upload = multer({
  storage: multer.memoryStorage(),
});

const handler = nextConnect();

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

export default withIronSessionApiRoute(
  handler.put(async (req: any, res: NextApiResponse) => {
    const user = req.session.user;
    if (!user) return res.status(401).json({ message: E2 });

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
          id: req.session.user.id,
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
  }),
  ironConfig
);

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
