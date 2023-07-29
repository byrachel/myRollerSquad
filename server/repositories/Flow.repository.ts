import prisma from "server/prisma/db/client";

import { FlowUseCase } from "../usecases/Flow.usecase";
import {
  BodyPostInterface,
  CompletePostInterface,
  GetPostsResponseInterface,
  UserPostInterface,
} from "models/entities/flow.entity";
import { isAlreadyLikedByThisUser } from "../controllers/checkLikes";
import { uploadImage } from "../utils/uploadImage";

function generateSlug(title: string) {
  const slug = title
    .toLowerCase() // Convert the title to lowercase
    .replace(/[^\w\s-]/g, "") // Remove non-alphanumeric characters except spaces and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .trim(); // Trim any leading or trailing whitespace

  return slug;
}

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
        take: 2,
        orderBy: {
          created_at: "desc",
        },
        where: {
          ...(category_id ? { category_id } : {}),
          ...(style_id ? { style: { some: { style_id } } } : {}),
        },
        include: {
          style: {
            select: {
              style_id: true,
            },
          },
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
          user_likes: {
            select: {
              user_id: true,
            },
          },
          comments: {
            select: {
              id: true,
            },
          },
        },
      });
      return { posts, nextId: cursor + 2 };
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
        include: {
          style: {
            select: {
              style_id: true,
            },
          },
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

  async getUserLatestPosts(
    user_id: number
  ): Promise<UserPostInterface[] | null> {
    try {
      const posts = await prisma.post.findMany({
        where: {
          user_id,
          place_id: null,
        },
        orderBy: {
          created_at: "desc",
        },
        take: 3,
      });
      if (!posts) return null;
      return posts;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async getPlaceLatestPosts(
    place_id: number
  ): Promise<UserPostInterface[] | null> {
    try {
      const posts = await prisma.post.findMany({
        where: {
          place_id,
        },
        orderBy: {
          created_at: "desc",
        },
        take: 3,
      });
      if (!posts) return null;
      return posts;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async getPostById(post_id: number): Promise<CompletePostInterface | null> {
    try {
      const post = await prisma.post.findUnique({
        where: {
          id: post_id,
        },
        include: {
          style: {
            select: {
              style_id: true,
            },
          },
          comments: {
            select: {
              id: true,
              comment: true,
              published_at: true,
              author: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
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
          user_likes: {
            select: {
              user_id: true,
            },
          },
        },
      });
      if (!post) return null;
      return post;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async addOrRemoveLike(
    user_id: number,
    post_id: number
  ): Promise<{ liked: boolean } | null> {
    const post = await prisma.post.findUnique({
      where: { id: post_id },
      select: {
        user_likes: {
          select: {
            user_id: true,
          },
        },
      },
    });
    if (!post) return null;

    const postIsAlreadyLikedByThisUser = isAlreadyLikedByThisUser(
      post.user_likes,
      user_id
    );

    if (postIsAlreadyLikedByThisUser) {
      const postLiked = await prisma.postLiked.findUnique({
        where: {
          user_id_post_id: {
            user_id: user_id,
            post_id: post_id,
          },
        },
        select: {
          id: true,
        },
      });

      if (!postLiked) return null;
      try {
        await prisma.postLiked.delete({
          where: {
            id: postLiked.id,
          },
        });
        return { liked: false };
      } catch (error) {
        return null;
      }
    } else {
      try {
        await prisma.postLiked.create({
          data: {
            user_id,
            post_id,
          },
        });
        return { liked: true };
      } catch (error) {
        return null;
      }
    }
  }

  async createPost(
    user_id: number,
    data: BodyPostInterface,
    files: any[]
  ): Promise<any | null> {
    try {
      const pictures = [];

      const slug = generateSlug(user_id + "_" + data.title);

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

      if (files.length !== pictures.length) return null;

      const newPost = await prisma.post.create({
        data: {
          title: data.title,
          content: data.content ? data.content : "",
          user_id,
          place_id: data.place_id ? data.place_id : null,
          category_id: data.category_id,
          slug: slug,
          country: data.country ? data.country : "France",
          county: data.county ? data.county : null,
          city: data.city ? data.city : null,
          style: {
            create: data.style_ids.map((id: number) => ({
              style: { connect: { id } },
            })),
          },
          link: data.link ? data.link : null,
          duration: data.duration ? data.duration : null,
          distance: data.distance ? data.distance : null,
          price: data.price ? parseInt(data.price) : null,
          pictures,
        },
        include: {
          style: true,
        },
      });
      console.log(newPost);
      if (!newPost) return null;
      return newPost;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async addPicturesToPost(
    post_id: number,
    files: any[]
  ): Promise<UserPostInterface | null> {
    const pictures = [];
    try {
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

      if (pictures.length > 0 && pictures.length === files.length) {
        const newPost = await prisma.post.update({
          where: {
            id: post_id,
          },
          data: {
            pictures,
          },
        });
        return newPost;
      } else {
        await prisma.post.delete({
          where: {
            id: post_id,
          },
        });
        return null;
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async updatePost(
    post_id: number,
    data: BodyPostInterface
  ): Promise<CompletePostInterface | null> {
    try {
      const updatedPost = await prisma.post.update({
        where: { id: post_id },
        data: {
          title: data.title,
          content: data.content ? data.content : "",
          category: { connect: { id: data.category_id } },
          country: data.country ? data.country : "France",
          county: data.county ? data.county : null,
          city: data.city ? data.city : null,
          style: {
            deleteMany: {},
            create: data.style_ids.map((id: number) => ({
              style: { connect: { id } },
            })),
          },
          link: data.link ? data.link : null,
          duration: data.duration ? data.duration : null,
          distance: data.distance ? data.distance : null,
          price: data.price ? parseInt(data.price) : null,
          pictures: data.pictures,
        },
        include: {
          style: true,
          category: true,
        },
      });
      if (!updatedPost) return null;
      return updatedPost;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async deletePost(post_id: number): Promise<{ deleted: boolean } | null> {
    try {
      const isDeleted = await prisma.post.delete({
        where: {
          id: post_id,
        },
      });
      if (!isDeleted) return null;
      return { deleted: true };
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
