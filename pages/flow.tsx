import React from "react";
import Masonry from "react-masonry-css";
import { PostInterface } from "../interface/Flow";
import Card from "../components/flow/Card";

interface Props {
  data: PostInterface[];
}

const breakpointColumnsObj = {
  default: 2,
  700: 1,
};

export default function Flow({ data }: Props) {
  console.log(data);

  return (
    <div className="flowContainer">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {data && data.length > 0
          ? data.map(post => <Card post={post} key={post.id} />)
          : null}
      </Masonry>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/flow`);
  const data = await res.json();

  return { props: { data } };
}
