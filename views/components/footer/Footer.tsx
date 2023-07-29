import Link from "next/link";
import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      {`Copyright © myRollerSquad ${year}`} -{" "}
      <Link href={`/notes/legals`}>Mentions légales</Link>
    </footer>
  );
}
