import multer from "multer";
import nextConnect from "next-connect";

import prisma from "../../../../server/prisma/db/client";
import { uploadImage } from "../../../../server/utils/uploadImage";
import { E1, E2, E3 } from "src/constants/ErrorMessages";
import { ironSessionMiddleware } from "@/server/middleware/auth/ironSessionMiddleware";
// import {
//   initValidation,
//   check,
// } from "../../../../server/middleware/validators";

// const validator = initValidation([
//   check("title")
//     .not()
//     .isEmpty()
//     .trim()
//     .isLength({ min: 3, max: 30 })
//     .withMessage(
//       "TITLE can't be empty and must have minimum length of 3 and maximum 30"
//     ),
//   check("content").trim(),
//   check("link").trim(),
//   check("price").trim(),
//   check("country").trim(),
//   check("city").trim(),
//   check("duration").trim(),
//   check("distance").trim(),
//   check("category_id").not().isEmpty().trim(),
//   check("style_id").trim(),
// ]);

const upload = multer({
  storage: multer.memoryStorage(),
});

const handler = nextConnect();

handler
  // .use(validator)
  .use(upload.array("pictures", 5))
  .post(async (req: any, res: any) => {
    const user = await ironSessionMiddleware(req);
    if (!user) return res.status(401).json({ code: E2 });

    const {
      title,
      content,
      category_id,
      style_id,
      link,
      duration,
      distance,
      squad_ids,
      country,
      city,
      price,
    } = req.body;

    if (!title || !category_id) return res.status(400).json({ code: E3 });

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

      const newPost = await prisma.post.create({
        data: {
          title,
          content,
          hashtags: [],
          // created_at: new Date().toISOString(),
          user_id: user.id,
          category_id: parseInt(category_id),
          country: country && city !== "null" ? country : "France",
          pictures,
          squad_ids: squad_ids && squad_ids.length > 0 ? squad_ids : [],
          style_id: style_id && style_id !== "null" ? parseInt(style_id) : null,
          link: link && link !== "null" ? link : null,
          duration: duration && duration !== "null" ? duration : null,
          distance: distance && distance !== "null" ? distance : null,
          price: price && price !== "null" ? parseFloat(price) : null,
          city: city && city !== "null" ? city : null,
        },
      });

      res.status(200).json({ post: { id: newPost.id } });
    } catch (e) {
      return res.status(401).json({ code: E1 });
    }
  });
export default handler;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
