import { withIronSessionApiRoute } from "iron-session/next";
import multer from "multer";
import sharp from "sharp";

import prisma from "../../../server/prisma/db/client";
import { uploadImage } from "../../../server/utils/uploadImage";
import { E1, E2 } from "src/constants/ErrorMessages";
import { ironConfig } from "@/server/middleware/auth/ironConfig";

const upload = multer({
  storage: multer.memoryStorage(),
});

const avatarUpload = upload.single("avatar");

export default withIronSessionApiRoute(avatarRoute, ironConfig);

async function avatarRoute(req: any, res: any) {
  if (req.method !== "PUT") return res.status(401).json({ code: E1 });

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

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
