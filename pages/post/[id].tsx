import React, { useMemo } from "react";
import prisma from "../../server/prisma/db/client";
import NewPostBar from "@/components/layouts/NewPostBar";
import { PostInterface } from "app/interfaces/flowInterfaces";
import { getCategoryName } from "app/constants/PostCategories";
import { cardColor } from "app/utils/colorManager";
import { getStyleName } from "app/constants/RollerSkateStyles";
import LikeIcon from "@/components/flow/getPosts/LikeIcon";
import { parseContent } from "app/utils/parseContent";
import { displayLightDateTime } from "app/utils/handleDates";
import Pin from "app/svg/pin.svg";
import Avatar from "@/components/flow/getPosts/Avatar";

interface Props {
  post: PostInterface;
}

export default function Post({ post }: Props) {
  console.log(post);
  const color = useMemo(() => cardColor(post.category_id), [post.category_id]);

  return (
    <>
      <NewPostBar />
      <div className="sidebarLayout">
        <div className="sidebarContent">
          <Avatar userId={post.user.id} userAvatar={post.user.avatar} />

          <div className="sidebarText">
            <div className={`badge ${color}`}>
              {getCategoryName(post.category_id)}
            </div>
            {post.style_id ? (
              <div className={`outlineBadge ${color}`}>
                {getStyleName(post.style_id)}
              </div>
            ) : null}
            <div className="cardIcons">
              <div className="cardSocialIcons">
                <LikeIcon
                  color={color}
                  counter={post.user_likes.length}
                  postId={post.id}
                  likedBy={post.user_likes.map(like => like.user_id)}
                />
              </div>
            </div>
            <p className="meta">
              myRollerSquad est une communauté active & bienveillante de
              passionnés de roller quad.
            </p>
          </div>
        </div>
        <div className="sidebarContainer">
          <h2>{post.title}</h2>
          <div className="singleCardMeta">
            <p className="cardMetaText">
              {displayLightDateTime(post.created_at)}
              <Pin width={12} height={12} className="metaIcon" />
              {post.city ? `${post.city}, ` : null}
              {post.country}
            </p>
          </div>
          <div className="singlePostContent">
            {post.content ? parseContent(post.content) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const posts = await prisma.post.findMany();

  const paths = posts.map(post => ({
    params: {
      id: post.id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

interface IParams {
  params: {
    id: string;
  };
}

export async function getStaticProps({ params: { id } }: IParams) {
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      comments: true,
      user_likes: true,
      user: {
        select: {
          id: true,
        },
      },
    },
  });

  const data = {
    ...post,
    created_at: post ? post.created_at.toISOString() : null,
    // user_likes: post ? post.user_likes.length : [],
  };

  return {
    props: {
      post: data,
    },
  };
}
