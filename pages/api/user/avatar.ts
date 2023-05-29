import { NextApiResponse } from "next";
import nextConnect from "next-connect";
import multer from "multer";

import { E1, E2 } from "src/constants/ErrorMessages";
import { checkUserIsConnected } from "@/server/controllers/checkUser";
import { UserProfileRepository } from "@/server/repositories/UserProfile.repository";

const upload = multer({
  storage: multer.memoryStorage(),
});

const handler = nextConnect();

export default handler
  .use(upload.single("avatar"))
  .put(async (req: any, res: NextApiResponse) => {
    const user = await checkUserIsConnected(req, res);
    if (!user) return res.status(401).json({ message: E2 });
    const { buffer } = req.file;
    if (!buffer) return res.status(400).json({ message: E1 });
    const userRepo = new UserProfileRepository();
    const userUpdated = await userRepo.updateAvatar(user.id, buffer);
    if (!userUpdated) return res.status(400).json({ message: E1 });
    res.status(200).json({ user: userUpdated });
  });

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
