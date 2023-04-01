import axios from "axios";
import React from "react";

interface Props {
  props: any;
}

export default function Manager({ props }: Props) {
  console.log(props);
  return <h1>ADMIN</h1>;
}

export async function getStaticProps() {
  const result = await axios.get("http://localhost:3000/api/admin/categories");
  const data = result.data.categories;
  console.log(data);
  return {
    props: {
      data,
    },
  };
}
