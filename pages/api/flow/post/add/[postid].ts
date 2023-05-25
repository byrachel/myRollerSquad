import multer from "multer";
import nextConnect from "next-connect";

import prisma from "server/prisma/db/client";
import { uploadImage } from "server/utils/uploadImage";
import { E1, E2 } from "src/constants/ErrorMessages";
import { checkUserIsConnected } from "server/controllers/checkUserId";
import { NextApiResponse } from "next";

const upload = multer({
  storage: multer.memoryStorage(),
});

const handler = nextConnect();

export default handler
  .use(upload.array("pictures", 5))
  .put(async (req: any, res: NextApiResponse) => {
    const { postid } = req.query;
    const id = Array.isArray(postid) ? postid[0] : postid;
    if (!id) return res.status(400).json({ message: E1 });

    const user = await checkUserIsConnected(req, res);
    if (!user) return res.status(401).json({ message: E2 });

    try {
      const files = req.files;
      const pictures = [];

      if (files && files.length > 0 && process.env.S3_FLOW_BUCKET_NAME) {
        for (const file of files) {
          const image = await uploadImage(
            process.env.S3_FLOW_BUCKET_NAME,
            file
          );
          if (image && image.Key) {
            pictures.push(image.Key);
          }
        }
      }

      if (pictures.length > 0 && pictures.length === req.files.length) {
        const newPost = await prisma.post.update({
          where: {
            id: parseInt(id),
          },
          data: {
            pictures,
          },
        });
        res.status(200).json({ post: newPost });
      } else {
        await prisma.post.delete({
          where: {
            id: parseInt(id),
          },
        });
        res.status(400).json({ message: E1 });
      }
    } catch (e) {
      console.log(e);
      return res.status(401).json({ message: E1 });
    }
  });

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
