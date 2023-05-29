import nextConnect from "next-connect";

import prisma from "server/prisma/db/client";
import { E1, E2, E3, E7 } from "src/constants/ErrorMessages";
import { initValidation, check } from "server/middleware/validators";
import { checkUserIsConnected } from "@/server/controllers/checkUser";

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

export default handler.use(validator).post(async (req: any, res: any) => {
  const user = await checkUserIsConnected(req, res);
  if (!user || user.id !== req.body.user_id)
    return res.status(401).json({ message: E2 });

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
});
