import { NextApiResponse } from "next";
import multer from "multer";
import sharp from "sharp";

import prisma from "@/server/prisma/db/client";
import { uploadImage } from "@/server/utils/uploadImage";
import { E1, E2 } from "src/constants/ErrorMessages";
import { exclude } from "@/server/utils/prismaExclude";
import { checkUserIsConnected } from "@/server/controllers/checkUserId";
import nextConnect from "next-connect";

const upload = multer({
  storage: multer.memoryStorage(),
});

const handler = nextConnect();

export default handler
  .use(upload.single("avatar"))
  .put(async (req: any, res: NextApiResponse) => {
    const user = await checkUserIsConnected(req, res);
    if (!user) return res.status(401).json({ message: E2 });

    try {
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

      const userToUpdate = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          avatar: avatar.Key,
        },
      });
      if (!userToUpdate) return res.status(401).json({ message: E1 });
      const userWithoutPassword = exclude(userToUpdate, ["password"]);
      res.status(200).json({ user: userWithoutPassword });
    } catch (e) {
      return res.status(401).json({ message: E1 });
    }
  });

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
