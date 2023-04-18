import React, { useContext, useMemo } from "react";
import { UserContext } from "app/context/UserContext";
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
import Roller from "app/svg/rollerquad.svg";
import Edit from "app/svg/edit.svg";

interface Props {
  post: PostInterface;
}

export default function Post({ post }: Props) {
  console.log(post);
  const color = useMemo(() => cardColor(post.category_id), [post.category_id]);
  const { userState } = useContext(UserContext);
  const userConnectedId = userState.user.id;

  return (
    <>
      <NewPostBar />
      <div className="sidebarLayout">
        <div className="sidebarContent">
          <div className="center mt5">
            <Avatar userId={post.user.id} userAvatar={post.user.avatar} />
            <h2>{post.user.name}</h2>
            <p className="meta">{post.user.posts.length} articles publiés</p>
          </div>

          {post.user.posts.length > 1 ? (
            <div className="lastPosts">
              <h3>Derniers articles:</h3>
              <ul>
                {post.user.posts.map(elt =>
                  post.id === elt.id ? null : (
                    <li key={post.id}>
                      <a href={`/post/${elt.id}`}>{elt.title}</a>
                    </li>
                  )
                )}
              </ul>
            </div>
          ) : null}
          <div className="sidebarText">
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
          <div className="spaceBetween">
            <div className="flexStart">
              <div className={`staticBadge ${color}`}>
                {getCategoryName(post.category_id)}
              </div>
              {post.style_id ? (
                <div className={`staticOutlineBadge ${color}`}>
                  {getStyleName(post.style_id)}
                </div>
              ) : null}
            </div>
            {post.user.id === userConnectedId ? (
              <Edit width={28} height={28} className="metaIcon" />
            ) : null}
          </div>
          <h1>{post.title}</h1>
          <div className="singleCardMeta">
            <p className="cardMetaText">
              {displayLightDateTime(post.created_at)}
              <Pin width={12} height={12} className="metaIcon" />
              {post.city ? `${post.city}, ` : null}
              {post.country}
            </p>
          </div>
          {post.distance || post.duration ? (
            <div className="sessionTracking">
              <Roller className="sessionIcon" width={28} height={28} />
              {post.distance ? <p>{post.distance} km</p> : null}
              {post.duration ? <p>{post.duration}</p> : null}
            </div>
          ) : null}
          <div className="postContent mt5">
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
      user_likes: {
        select: {
          user_id: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          posts: {
            take: 3,
            select: {
              id: true,
              title: true,
            },
          },
          country: true,
        },
      },
    },
  });

  const data = {
    ...post,
    created_at: post ? post.created_at.toISOString() : null,
    user_likes: post ? post.user_likes : [],
    distance: post && post.distance ? JSON.stringify(post.distance) : null,
  };

  return {
    props: {
      post: data,
    },
  };
}
