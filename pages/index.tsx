import React from "react";
import FindACoach from "../app/components/homepage/FindACoach";
import Hero from "../app/components/homepage/Hero";
import NextEvent from "../app/components/homepage/NextEvent";

import { withSessionSsr } from "app/utils/withSession";

export default function Home({ user }: any) {
  console.log(user);
  return (
    <>
      <Hero />
      <FindACoach />
      <NextEvent />
    </>
  );
}
export const getServerSideProps = withSessionSsr(async ({ req, res }) => {
  const user = req.session;

  if (!user) {
    return {
      notFound: true,
    };
  }

  return {
    props: { user },
  };
});
