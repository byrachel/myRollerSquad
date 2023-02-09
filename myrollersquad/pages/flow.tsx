import React from "react";
import Masonry from 'react-masonry-css';
import { PostInterface } from "../interface/Flow";
import styles from "../styles/Flow.module.scss";

interface Props {
  data: PostInterface[]
}

const breakpointColumnsObj = {
  default: 2,
  700: 1
};

export default function Flow({data}: Props) {
  console.log(data)
  return (
    <div className={styles.flowContainer}>
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column">
      {data && data.length > 0 ?
        data.map((post) => 
          <div className={styles.postContainer} key={post.id}>
            <h2>{post.title}</h2>
            <h3>{post.content}</h3>
            <div>{post.hashtags.length > 0 ?
              post.hashtags.map((hashtag, index) => <p key={index}>{hashtag}</p>): null}
            </div>
          </div>)
      : null }
    </Masonry></div>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/flow`)
  const data = await res.json()

  return { props: { data } }
}
