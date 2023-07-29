import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";

import { getCategoryName } from "views/constants/PostCategories";
import { CommentInterface, PostInterface } from "models/entities/flow.entity";
import { cardColor } from "views/utils/colorManager";
import { displayLightDateTime } from "views/utils/handleDates";
import { parseContent } from "views/utils/parseContent";
import { getStyleName } from "views/constants/RollerSkateStyles";
import { deletePost } from "../addPost/utils/deletePost";
import EditPost from "./EditPost";
import LikeIcon from "../getPosts/LikeIcon";
import UpdateDeleteIcons from "views/components/buttons/UpdateDeleteIcons";
import CommentsList from "../comment/CommentsList";
import AddComment from "../comment/AddComment";
import Avatar from "../getPosts/Avatar";

import Pin from "views/svg/pin.svg";
import Roller from "views/svg/rollerquad.svg";
import PostLink from "../getPosts/PostLink";

interface Props {
  post: PostInterface;
}

export default function SinglePost({ post }: Props) {
  const { data: session } = useSession() as any;
  const userId = session?.user?.id;

  const color = useMemo(() => cardColor(post.category_id), [post.category_id]);
  const [editPost, setEditPost] = useState<{
    show: boolean;
    post: PostInterface | null;
  }>({ show: false, post: null });
  const router = useRouter();
  const redirectAfterDelete = () => router.push(`/profile/posts/${userId}`);

  const [commentsCounter, setCommentsCounter] = useState(post.comments.length);
  const [comments, setComments] = useState<CommentInterface[]>(post.comments);

  return userId ? (
    editPost.show ? (
      <EditPost postToEdit={post} userConnectedId={userId} />
    ) : (
      <>
        <div className="spaceBetween">
          <div className={`staticBadge ${color}`}>
            {getCategoryName(post.category_id)}
          </div>
          {post.user && post.user.id === userId ? (
            <UpdateDeleteIcons
              onUpdate={() => setEditPost({ show: true, post: post })}
              onDelete={() => deletePost(userId, post.id, redirectAfterDelete)}
            />
          ) : null}
        </div>
        {post.style.length > 0 ? (
          <div className="flexStart">
            {post.style.map((elt) => (
              <div className={`staticOutlineBadge ${color}`} key={elt.style_id}>
                {getStyleName(elt.style_id)}
              </div>
            ))}
          </div>
        ) : null}

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

        {post.price ? (
          <div className="sessionTracking">
            <Roller className="sessionIcon" width={36} height={36} />
            <p>{post.price} €</p>
          </div>
        ) : null}

        <div className="postContent mt5">
          {post.content ? parseContent(post.content) : null}
        </div>

        {post.link ? <PostLink link={post.link} /> : null}

        <div className="singlePostPicts">
          {post.pictures.length > 0
            ? post.pictures.map((pict, index) => (
                <Image
                  src={`https://myrollersquadflow.s3.eu-west-3.amazonaws.com/${pict}`}
                  alt="Roller Skateur"
                  className="pict"
                  sizes="(max-width: 768px) 100vw"
                  quality={80}
                  priority
                  fill
                  key={index}
                />
              ))
            : null}
        </div>
        <div className="lightBox">
          <LikeIcon
            color={color}
            counter={post.user_likes.length}
            postId={post.id}
            likedBy={post.user_likes.map((like) => like.user_id)}
            userConnectedId={userId}
          />
        </div>

        {commentsCounter > 0 ? (
          <>
            <p className="meta mt5">Commentaires :</p>
            <CommentsList
              userId={userId}
              comments={comments}
              setComments={setComments}
              setCommentsCounter={setCommentsCounter}
            />
          </>
        ) : null}
        {userId ? (
          <AddComment
            postId={post.id}
            userId={userId}
            setComments={setComments}
            setCommentsCounter={setCommentsCounter}
          />
        ) : null}

        {window.innerWidth < 860 ? (
          post.user ? (
            <div className="center mt5">
              <Avatar
                userId={post.user.id}
                userAvatar={post.user.avatar}
                color="pink"
                placeId={post.place ? post.place.id : null}
                logo={post.place ? post.place.logo : null}
              />
              <h3>{post.user.name}</h3>
            </div>
          ) : null
        ) : null}
      </>
    )
  ) : null;
}
