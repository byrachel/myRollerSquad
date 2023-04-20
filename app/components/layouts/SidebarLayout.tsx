import React from "react";

interface Props {
  sidebar: React.ReactNode;
  content: React.ReactNode;
}

export default function SidebarLayout({ sidebar, content }: Props) {
  return (
    <>
      <div className="coloredSeparator" />
      <div className="sidebarLayout">
        <div className="sidebarContent">
          <div className="sidebarText">{sidebar}</div>
        </div>
        <main className="sidebarContainer">{content}</main>
      </div>
    </>
  );
}
