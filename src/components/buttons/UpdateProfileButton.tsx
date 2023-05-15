import Link from "next/link";
import React from "react";
import Edit from "src/svg/edit.svg";

export default function UpdateProfileButton() {
  return (
    <Link href="/profile/update">
      <Edit className="editIcon" width={30} height={30} />
    </Link>
  );
}
