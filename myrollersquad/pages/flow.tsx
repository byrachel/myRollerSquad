import React from "react";

export default function Flow() {
  return <h1>Flow</h1>;
}

// export async function getServerSideProps(context: any) {
//   const { todo } = await fetch("http://localhost:3000/api/todo", {
//     method: "GET",
//     headers: { "Content-Type": "application/json" },
//   }).then(resp => resp.json());

//   return {
//     props: { todo },
//   };
// }
