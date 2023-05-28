import prisma from "server/prisma/db/client";

import { FlowUseCase } from "../usecases/Flow.usecase";
import {
  GetPostsResponseInterface,
  UserPostInterface,
} from "src/entities/flow.entity";

export class FlowRepository implements FlowUseCase {
  async getPosts(
    cursor: number,
    category_id: number | null,
    style_id: number | null
  ): Promise<GetPostsResponseInterface | null> {
    try {
      // const cursorObj = postsCursor === 0 ? undefined : { id: postsCursor };
      const posts = await prisma.post.findMany({
        skip: cursor,
        // cursor: cursorObj,
        take: 4,
        orderBy: {
          created_at: "desc",
        },
        where: {
          ...(category_id ? { category_id } : {}),
          ...(style_id ? { style: { some: { style_id } } } : {}),
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
      return { posts, nextId: cursor + 4 };
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async getUserPosts(user_id: number): Promise<UserPostInterface[] | null> {
    try {
      const posts = await prisma.post.findMany({
        where: {
          user_id,
        },
        orderBy: {
          created_at: "desc",
        },
        select: {
          id: true,
          user_id: true,
          place_id: true,
          title: true,
          category_id: true,
          style: {
            select: {
              style_id: true,
            },
          },
          created_at: true,
          pictures: true,
          comments: {
            select: {
              id: true,
            },
          },
          user_likes: {
            select: {
              user_id: true,
            },
          },
        },
      });
      if (!posts) return null;
      return posts;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  //   async updatePost(data: PostInterface): Promise<PostInterface | null> {
  //     return null;
  //   }

  //   async createPost(data: PostInterface): Promise<PostInterface | null> {
  //     return null;
  //   }

  //   async deletePost(id: number): Promise<void> {
  //     return null;
  //   }
}
