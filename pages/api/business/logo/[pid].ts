import { NextApiResponse } from "next";
import nextConnect from "next-connect";
import multer from "multer";
import sharp from "sharp";

import prisma from "@/server/prisma/db/client";
import { uploadImage } from "@/server/utils/uploadImage";
import { E1, E2 } from "src/constants/ErrorMessages";
import { checkUserIsConnected } from "@/server/controllers/checkUserId";

const upload = multer({
  storage: multer.memoryStorage(),
});

const handler = nextConnect();

export default handler
  .use(upload.single("logo"))
  .put(async (req: any, res: NextApiResponse) => {
    if (!req.file) return res.status(401).json({ message: E1 });
    const user = await checkUserIsConnected(req, res);
    if (!user) return res.status(401).json({ message: E2 });

    try {
      const resizedBuffer = await sharp(req.file.buffer)
        .resize({ width: 140, height: 140 })
        .toBuffer();

      if (!resizedBuffer || !process.env.S3_BUSINESS_LOGO_BUCKET_NAME)
        return res.status(401).json({ message: E2 });

      const logoFile = {
        ...req.file,
        buffer: resizedBuffer,
      };

      const logo = await uploadImage(
        process.env.S3_BUSINESS_LOGO_BUCKET_NAME,
        logoFile
      );

      if (!logo || !logo.Key) return res.status(401).json({ message: E1 });

      const place = await prisma.place.update({
        where: {
          id: parseInt(req.query.pid),
          user_id: user.id,
        },
        data: {
          logo: logo.Key,
        },
        include: {
          favorites: {
            select: {
              id: true,
            },
          },
        },
      });
      if (!place) return res.status(401).json({ message: E1 });
      res.status(200).json({ place });
    } catch (e) {
      return res.status(401).json({ message: E1 });
    }
  });

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
