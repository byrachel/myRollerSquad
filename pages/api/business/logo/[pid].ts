import { NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import nextConnect from "next-connect";
import multer from "multer";
import sharp from "sharp";

import prisma from "@/server/prisma/db/client";
import { uploadImage } from "@/server/utils/uploadImage";
import { E1, E2 } from "src/constants/ErrorMessages";
import { ironConfig } from "@/server/middleware/auth/ironConfig";

const upload = multer({
  storage: multer.memoryStorage(),
});

const handler = nextConnect();

export default withIronSessionApiRoute(
  handler
    .use(upload.single("logo"))
    .put(async (req: any, res: NextApiResponse) => {
      const user = req.session.user;
      if (!user) return res.status(401).json({ message: E2 });
      if (!req.file) return res.status(401).json({ message: E1 });

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

        res.status(200).json({ place });
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
