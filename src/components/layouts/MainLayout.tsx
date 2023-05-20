import React from "react";
import Header from "../header/Header";
import RollerStylesBar from "./RollerStylesBar";

interface Props {
  children: JSX.Element;
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      <Header />
      <RollerStylesBar />
      {children}
    </>
  );
}
