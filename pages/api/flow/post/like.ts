import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import { E1, E2 } from "src/constants/ErrorMessages";
import { initValidation, check } from "@/server/middleware/validators";
import { checkUserIsConnected } from "@/server/controllers/checkUser";
import { FlowRepository } from "@/server/repositories/Flow.repository";

const validator = initValidation([
  check("post_id").not().isEmpty().trim().escape().withMessage(E1),
  check("user_id").not().isEmpty().trim().escape().withMessage(E2),
]);

const handler = nextConnect();

export default handler
  .use(validator)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await checkUserIsConnected(req, res);
    if (!user) return res.status(401).json({ message: E2 });

    const { user_id, post_id } = req.body;
    if (user.id !== parseInt(user_id))
      return res.status(401).json({ message: E2 });

    const flowRepo = new FlowRepository();
    const isLiked = await flowRepo.addOrRemoveLike(
      parseInt(user_id),
      parseInt(post_id)
    );

    if (!isLiked) return res.status(500).json({ message: E1 });
    res.status(200).json({ liked: isLiked.liked });
  });
