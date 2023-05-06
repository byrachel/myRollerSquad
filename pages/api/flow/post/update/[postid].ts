import nextConnect from "next-connect";
import { withIronSessionApiRoute } from "iron-session/next";

import prisma from "../../../../../server/prisma/db/client";
import { E1, E2, E3 } from "src/constants/ErrorMessages";
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
  check("content").optional().trim().escape(),
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

export default withIronSessionApiRoute(
  handler.use(validator).put(async (req: any, res: any) => {
    const { user } = req.session;
    console.log("user", user);
    if (!user) return res.status(401).json({ message: E2 });

    const { postid } = req.query;
    if (!postid) return res.status(400).json({ message: E1 });

    console.log(postid);

    const {
      title,
      content,
      category_id,
      style_ids,
      link,
      duration,
      distance,
      // squad_ids,
      country,
      county,
      city,
      price,
      pictures,
    } = req.body;

    console.log(req.body);

    if (!title || !category_id) return res.status(400).json({ message: E3 });

    try {
      const newPost = await prisma.post.update({
        where: { id: parseInt(postid) },
        data: {
          title,
          content: content ? content : "",
          category: { connect: { id: category_id } },
          country: country ? country : "France",
          county: county ? county : null,
          city: city ? city : null,
          style: {
            create: style_ids.map((id: number) => ({
              style: { connect: { id } },
            })),
            deleteMany: {
              OR: style_ids.map((id: number) => ({
                style_id: id,
              })),
            },
          },
          link: link ? link : null,
          duration: duration ? duration : null,
          distance: distance ? distance : null,
          price: price ? parseFloat(price) : null,
          pictures: pictures,
          // squad_ids: squad_ids ? squad_ids : [],
        },
        include: {
          style: true,
          category: true,
        },
      });

      console.log(newPost);

      res.status(200).json({ post: newPost });
    } catch (e) {
      console.log(e);
      return res.status(401).json({ message: E1 });
    }
  }),
  ironConfig
);
