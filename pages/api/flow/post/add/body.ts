import nextConnect from "next-connect";
import { withIronSessionApiRoute } from "iron-session/next";

import prisma from "../../../../../server/prisma/db/client";
import { E1, E2, E3 } from "client/constants/ErrorMessages";
import { ironConfig } from "@/server/middleware/auth/ironConfig";
import { initValidation, check } from "@/server/middleware/validators";

const handler = nextConnect();

const validator = initValidation([
  check("title")
    .not()
    .isEmpty()
    .escape()
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage(
      "TITLE can't be empty and must have minimum length of 3 and maximum 30"
    ),
  check("content").optional().trim(),
  check("link").isURL().optional({ nullable: true }).withMessage(E3),
  check("price").optional().isNumeric().withMessage(E3),
  check("country").optional().trim().escape(),
  check("county").optional().trim().escape(),
  check("city").optional().trim().escape(),
  check("duration").optional().trim().escape(),
  check("distance").optional().trim().escape(),
  check("category_id").not().isEmpty().isNumeric().withMessage(E3),
  check("style_ids").isArray().withMessage(E3),
]);

export default withIronSessionApiRoute(
  handler.use(validator).post(async (req: any, res: any) => {
    const { user } = req.session;
    if (!user) return res.status(401).json({ message: E2 });

    const {
      title,
      content,
      category_id,
      style_ids,
      link,
      duration,
      distance,
      country,
      county,
      city,
      price,
      place_id,
    } = req.body;

    if (!title || !category_id) return res.status(400).json({ message: E3 });

    try {
      const newPost = await prisma.post.create({
        data: {
          title,
          content: content ? content : "",
          user_id: user.id,
          place_id: place_id ? place_id : null,
          category_id,
          country: country ? country : "France",
          county: county ? county : null,
          city: city ? city : null,
          style: {
            create: style_ids.map((id: number) => ({
              style: { connect: { id } },
            })),
          },
          link: link ? link : null,
          duration: duration ? duration : null,
          distance: distance ? distance : null,
          price: price ? parseFloat(price) : null,
          pictures: [],
        },
      });

      res.status(200).json({ post: newPost });
    } catch (e) {
      console.log(e);
      return res.status(401).json({ message: E1 });
    }
  }),
  ironConfig
);
