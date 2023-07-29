import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";

import { E1, E2, E3, E7 } from "views/constants/ErrorMessages";
import { initValidation, check } from "server/middleware/validators";
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
  check("content").trim(),
  check("link").isURL().optional({ nullable: true }).withMessage(E3),
  check("price").optional().trim().escape(),
  check("country").optional().trim().escape(),
  check("county").optional({ nullable: true }).trim().escape(),
  check("city").optional({ nullable: true }).trim().escape(),
  check("duration").optional({ nullable: true }).trim().escape(),
  check("distance").optional({ nullable: true }).trim().escape(),
  check("category_id").not().isEmpty().isNumeric().withMessage(E3),
  check("style_ids").isArray().withMessage(E3),
  check("place_id").optional({ nullable: true }),
  check("user_id").not().isEmpty().withMessage(E2),
]);

export default handler
  .use(validator)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await checkUserIsConnected(req, res);
    if (!user || user.id !== req.body.user_id)
      return res.status(401).json({ message: E2 });

    const flowRepo = new FlowRepository();
    const post = await flowRepo.createPost(user.id, req.body);
    if (!post) return res.status(500).json({ message: E1 });
    return res.status(200).json({ post });
  });
