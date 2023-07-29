import multer from "multer";
import { NextApiRequest, NextApiResponse } from "next";
import { check, validationResult } from "express-validator";
import { E1, E2, E3, E7 } from "views/constants/ErrorMessages";
import { checkUserIsConnected } from "@/server/controllers/checkUser";
import { FlowRepository } from "@/server/repositories/Flow.repository";

const validations = [
  check("title")
    .not()
    .isEmpty()
    .escape()
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage(E7),
  check("content").trim(),
  check("link").trim().escape(),
  check("price").optional().trim().escape(),
  check("country").optional().trim().escape(),
  check("county").trim().escape(),
  check("city").trim().escape(),
  check("duration").trim().escape(),
  check("distance").trim().escape(),
  check("category_id").not().isEmpty().isNumeric().withMessage(E3),
  check("style_ids").trim().escape(),
  check("place_id").optional().trim().escape(),
  check("user_id").not().isEmpty().isNumeric().withMessage(E2),
];

function runMiddleware(
  req: NextApiRequest & { [key: string]: any },
  res: NextApiResponse,
  fn: (...args: any[]) => void
): Promise<any> {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

const validate = async (validations: any, req: any) => {
  return new Promise(async (resolve, reject) => {
    for (const validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return resolve(true);
    }
    return reject(errors.array());
  });
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (
  req: NextApiRequest & { [key: string]: any },
  res: NextApiResponse
): Promise<void> => {
  const user = await checkUserIsConnected(req, res);
  if (!user || !user.id) return res.status(400).json({ message: E3 });

  const multerUpload = multer({
    storage: multer.memoryStorage(),
  });

  try {
    await runMiddleware(req, res, multerUpload.array("pictures", 5));
    const files = req.files;

    await validate(validations, req);

    const body = req.body;
    if (
      !body.user_id ||
      !body.category_id ||
      user.id !== parseInt(body.user_id)
    )
      return res.status(400).json({ message: E3 });

    for (const [key, val] of Object.entries(body)) {
      if (
        key === "user_id" ||
        key === "place_id" ||
        key === "category_id" ||
        key === "distance"
      ) {
        body[key] = JSON.parse(val as string);
      }
      if (key === "style_ids") {
        const values = val as string;
        if (values === "[]") {
          body[key] = [];
        } else {
          const valuesInArray = values.split(",");
          const intValuesInArray = valuesInArray.map((item) => parseInt(item));
          body[key] = intValuesInArray;
        }
      }
      if (
        key === "link" ||
        key === "city" ||
        key === "county" ||
        key === "duration" ||
        key === "price" ||
        key === "content" ||
        key === "title"
      ) {
        if (body[key] === "null") {
          body[key] = null;
        }
      }
    }

    const flowRepo = new FlowRepository();
    const post = await flowRepo.createPost(user.id, body, files);
    if (!post) return res.status(400).json({ message: E1 });
    return res.status(200).json({ post });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ message: E1 });
  }
};

export default handler;

//   const fileUploadAllowed = // business logic
//   if (fileUploadAllowed) {
//     // Parse req.files
//     await runMiddleware(
//       req,
//       res,
//       multer({
//         limits: { fileSize: MAX_FILE_SIZE },
//         storage: multerS3({
//           s3,
//           bucket: process.env.FILE_SERVER_BUCKET,
//           acl: 'public-read',
//           key(_, file, cb) {
//             cb(null, `${user._id}/${form._id}/${submissionId}/${file.originalname}`);
//           },
//         }),
//       }).array('_file', 5),
//     );
//   }
