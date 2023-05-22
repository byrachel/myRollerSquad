import React from "react";
import FindACoach from "../client/features/Homepage/FindACoach";
import Hero from "../client/features/Homepage/Hero";
import NextEvent from "../client/features/Homepage/NextEvent";
import Instagram from "client/features/Homepage/InstagramContainer";

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
