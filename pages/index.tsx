import React from "react";
import FindACoach from "../views/features/Homepage/FindACoach";
import Hero from "../views/features/Homepage/Hero";
import NextEvent from "../views/features/Homepage/NextEvent";
import Instagram from "views/features/Homepage/InstagramContainer";

export default function Home() {
  return (
    <>
      <Hero />
      <FindACoach />
      <Instagram />
      <NextEvent />
    </>
  );
}
