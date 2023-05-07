import React from "react";
import * as category from "src/constants/PostCategories";

interface Props {
  postCategory: number;
  postDispatch: React.Dispatch<any>;
}

export default function SelectCategory({ postCategory, postDispatch }: Props) {
  return (
    <div className="flexStart">
      {category.flowCategories.map((category) => (
        <div
          role="button"
          key={category.id}
          tabIndex={0}
          className={
            category.id === postCategory ? `badge pink` : "outlineBadge grey"
          }
          onClick={() =>
            postDispatch({
              type: "SAVE_CATEGORY",
              payload: category.id,
            })
          }
          onKeyDown={() =>
            postDispatch({
              type: "SAVE_CATEGORY",
              payload: category.id,
            })
          }
        >
          {category.name}
        </div>
      ))}
    </div>
  );
}
