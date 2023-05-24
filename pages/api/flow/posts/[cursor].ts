import type { NextApiRequest, NextApiResponse } from "next";
// import { withIronSessionApiRoute } from "iron-session/next";

import prisma from "../../../../server/prisma/db/client";
// import { ironConfig } from "@/server/middleware/auth/ironConfig";
import { E1 } from "src/constants/ErrorMessages";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(401).json({ message: E1 });

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: E1 });

  const { cursor, category, style } = req.query;
  const cursorValue = Array.isArray(cursor) ? cursor[0] : cursor;
  const postsCursor = cursorValue ? parseInt(cursorValue) : 0;

  try {
    // const cursorObj = postsCursor === 0 ? undefined : { id: postsCursor };
    const posts = await prisma.post.findMany({
      skip: postsCursor,
      // cursor: cursorObj,
      take: 4,
      orderBy: {
        created_at: "desc",
      },
      where: {
        ...(category ? { category_id: parseInt(category) } : {}),
        ...(style ? { style: { some: { style_id: parseInt(style) } } } : {}),
      },
      select: {
        id: true,
        title: true,
        content: true,
        category_id: true,
        style: {
          select: {
            style_id: true,
          },
        },
        created_at: true,
        pictures: true,
        link: true,
        comments: true,
        user: {
          select: {
            avatar: true,
            id: true,
            name: true,
          },
        },
        place: {
          select: {
            id: true,
            name: true,
            logo: true,
          },
        },
        city: true,
        county: true,
        country: true,
        user_likes: {
          select: {
            user_id: true,
          },
        },
        price: true,
        distance: true,
        duration: true,
      },
    });
    res.status(200).json({ posts, nextId: postsCursor + 4 });
  } catch (e) {
    res.status(400).json({ message: E1 });
  }
}

// export default withIronSessionApiRoute(userRoute, ironConfig);

// async function userRoute(req: any, res: NextApiResponse<any>) {
//   if (req.method !== "GET") return res.status(401).json({ message: E1 });
//   const user = req.session.user;
//   const { cursor, category, style } = req.query;
//   if (!user) return res.status(401).json({ message: E1 });
//   const postsCursor = cursor ? parseInt(cursor) : 0;

//   const session = await getServerSession(req, res, authOptions);
//   console.log(session);

//   try {
//     // const cursorObj = postsCursor === 0 ? undefined : { id: postsCursor };
//     const posts = await prisma.post.findMany({
//       skip: postsCursor,
//       // cursor: cursorObj,
//       take: 4,
//       orderBy: {
//         created_at: "desc",
//       },
//       where: {
//         ...(category ? { category_id: parseInt(category) } : {}),
//         ...(style ? { style: { some: { style_id: parseInt(style) } } } : {}),
//       },
//       select: {
//         id: true,
//         title: true,
//         content: true,
//         category_id: true,
//         style: {
//           select: {
//             style_id: true,
//           },
//         },
//         created_at: true,
//         pictures: true,
//         link: true,
//         comments: true,
//         user: {
//           select: {
//             avatar: true,
//             id: true,
//             name: true,
//           },
//         },
//         place: {
//           select: {
//             id: true,
//             name: true,
//             logo: true,
//           },
//         },
//         city: true,
//         county: true,
//         country: true,
//         user_likes: {
//           select: {
//             user_id: true,
//           },
//         },
//         price: true,
//         distance: true,
//         duration: true,
//       },
//     });
//     res.status(200).json({ posts, nextId: postsCursor + 4 });
//   } catch (e) {
//     res.status(400).json({ message: E1 });
//   }
// }
