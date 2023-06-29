import React, { useState } from "react";

import CommentModal from "./CommentModal";
import Comment from "src/svg/chat-bubble.svg";

interface Props {
  counter: number;
  color: string;
  postId: number;
  userId: number | null;
  setCommentsCounter: React.Dispatch<React.SetStateAction<number>>;
}

export default function CommentIcon({
  counter,
  color,
  postId,
  userId,
  setCommentsCounter,
}: Props) {
  const [show, setShow] = useState(false);

  return userId ? (
    <>
      <div
        className="socialIconContainer"
        role="button"
        tabIndex={0}
        onKeyDown={() => setShow(true)}
        onClick={() => setShow(true)}
      >
        <Comment
          className={counter > 0 ? `linksIcon ${color}` : "linksIcon grey"}
          width={30}
          height={30}
        />
        <p className="cardMetaText">{counter}</p>
      </div>
      <CommentModal
        postId={postId}
        userId={userId}
        show={show}
        setShow={setShow}
        setCommentsCounter={setCommentsCounter}
      />
    </>
  ) : null;
}
