import React from "react";

interface Props {
  sidebar: React.ReactNode;
  content: React.ReactNode;
}

export default function SidebarLayout({ sidebar, content }: Props) {
  return (
    <div className="sidebarLayout">
      <div className="sidebarContent">{sidebar}</div>
      <main className="sidebarContainer">{content}</main>
    </div>
  );
}
