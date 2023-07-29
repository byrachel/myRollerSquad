import React from "react";
import { parseContent } from "views/utils/parseContent";

interface Props {
  link: string;
}

export default function PostLink({ link }: Props) {
  return (
    <div className="linkContainer">
      <a href={link} className="linkText">
        {parseContent(link)}
      </a>
    </div>
  );
}
