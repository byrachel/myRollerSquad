import multer from "multer";
import nextConnect from "next-connect";

import { E1 } from "src/constants/ErrorMessages";
import { checkUserIsConnected } from "@/server/controllers/checkUser";
import { NextApiResponse } from "next";
import { FlowRepository } from "@/server/repositories/Flow.repository";

const upload = multer({
  storage: multer.memoryStorage(),
});

const handler = nextConnect();

export default handler
  .use(upload.array("pictures", 5))
  .put(async (req: any, res: NextApiResponse) => {
    const { postid } = req.query;
    const id = Array.isArray(postid) ? postid[0] : postid;
    if (!id) return res.status(200).json({ post: {} });

    const user = await checkUserIsConnected(req, res);
    if (!user) return res.status(401).json({ message: E1 });

    const files = req.files;
    if (!req.files || req.files.length === 0)
      return res.status(200).json({ post: {} });

    const flowRepo = new FlowRepository();
    const post = await flowRepo.addPicturesToPost(parseInt(id), files);
    if (!post) return res.status(500).json({ message: E1 });
    return res.status(200).json({ post });
  });

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
