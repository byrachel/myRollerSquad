import React, { useEffect, useRef } from "react";

import Card from "./Card";
import { PostInterface } from "../../../interfaces/flowInterfaces";

interface Props {
  post: PostInterface;
  isLast: boolean;
  newLimit: () => void;
  userConnectedId: number;
}

export default function CardContainer({
  post,
  isLast,
  newLimit,
  userConnectedId,
}: Props) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        newLimit();
        observer.unobserve(entry.target);
      }
    });

    observer.observe(cardRef.current);
    // eslint-disable-next-line
  }, [isLast]);

  return (
    <Card post={post} cardRef={cardRef} userConnectedId={userConnectedId} />
  );
}
