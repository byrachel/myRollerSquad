import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import { E1, E2, E3, E7 } from "src/constants/ErrorMessages";
import { initValidation, check } from "@/server/middleware/validators";
import { checkUserIsConnected } from "@/server/controllers/checkUser";
import { FlowRepository } from "@/server/repositories/Flow.repository";

const handler = nextConnect();

const validator = initValidation([
  check("title")
    .not()
    .isEmpty()
    .escape()
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage(E7),
  check("content").optional().trim(),
  check("link").isURL().optional({ nullable: true }).withMessage(E1),
  check("price").optional().isNumeric().withMessage(E1),
  check("country").optional().trim().escape(),
  check("county").optional().trim().escape(),
  check("city").optional().trim().escape(),
  check("duration").optional().trim().escape(),
  check("distance").optional().trim().escape(),
  check("category_id").not().isEmpty().isNumeric().withMessage(E3),
  check("style_ids").isArray().withMessage(E3),
  check("pictures").isArray().withMessage(E3),
]);

export default handler
  .use(validator)
  .put(async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await checkUserIsConnected(req, res);
    if (!user || user.id !== req.body.user_id)
      return res.status(401).json({ message: E2 });

    const { postid } = req.query;
    if (!postid) return res.status(400).json({ message: E1 });
    const id = Array.isArray(postid) ? postid[0] : postid;

    const flowRepo = new FlowRepository();
    const updatedPost = await flowRepo.updatePost(parseInt(id), req.body);
    if (!updatedPost) return res.status(401).json({ message: E1 });
    res.status(200).json({ post: updatedPost });
  });
