import React from "react";
import FindACoach from "../src/features/Homepage/FindACoach";
import Hero from "../src/features/Homepage/Hero";
import NextEvent from "../src/features/Homepage/NextEvent";
import Instagram from "src/features/Homepage/InstagramContainer";

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
