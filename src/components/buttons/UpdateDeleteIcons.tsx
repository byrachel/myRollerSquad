import React from "react";

import Edit from "src/svg/edit.svg";
import Trash from "src/svg/trash.svg";

interface Props {
  onUpdate: () => void;
  onDelete: () => void;
}

export default function UpdateDeleteIcons({ onUpdate, onDelete }: Props) {
  return (
    <div className="updateDeleteIcons">
      <Edit
        width={25}
        height={25}
        className="icon"
        role="button"
        onClick={onUpdate}
      />
      <Trash
        width={22}
        height={22}
        className="icon"
        role="button"
        onClick={onDelete}
      />
    </div>
  );
}
