import React from "react";
import { PostInterface } from "src/interfaces/flowInterfaces";

interface Props {
  post: PostInterface;
}

export default function EditPost({ post }: Props) {
  console.log(post);
  return <div>EditPost</div>;
}
