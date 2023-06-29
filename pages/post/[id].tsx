import React from "react";
import SidebarLayout from "src/components/layouts/SidebarLayout";
import SinglePostSidebar from "@/components/sidebar/SinglePostSidebar";
import SinglePost from "src/features/Flow/singlePost/SinglePost";
import Loader from "src/components/layouts/Loader";
import { PostInterface } from "src/entities/flow.entity";
import UnloggedUserSidebar from "@/components/sidebar/UnloggedUserSidebar";
import { FlowRepository } from "@/server/repositories/Flow.repository";

interface Props {
  post: PostInterface | null;
}

export default function Post({ post }: Props) {
  return (
    <>
      {post ? (
        <SidebarLayout
          sidebar={
            post.user ? (
              <SinglePostSidebar user={post.user} place={post.place} />
            ) : (
              <UnloggedUserSidebar />
            )
          }
          content={<SinglePost post={post} />}
        />
      ) : (
        <Loader />
      )}
    </>
  );
}

export async function getStaticPaths() {
  try {
    const posts = await prisma.post.findMany();
    const data = posts.length > 0 ? posts : [];
    const paths = data.map((post: any) => ({
      params: { id: post.id.toString() },
    }));
    return { paths, fallback: true };
  } catch (error) {
    return { paths: [], fallback: true };
  }
}

export async function getStaticProps(context: any) {
  const { id } = context.params;
  if (!id) return { props: { post: null } };
  const flowRepo = new FlowRepository();
  const selectedPost = await flowRepo.getPostById(parseInt(id));
  if (!selectedPost) return { props: { post: null } };
  const post = JSON.parse(JSON.stringify(selectedPost));
  return { props: { post } };
}

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import axios from "axios";

// import SidebarLayout from "src/components/layouts/SidebarLayout";
// import SinglePostSidebar from "@/components/sidebar/SinglePostSidebar";
// import SinglePost from "src/features/Flow/singlePost/SinglePost";
// import Loader from "src/components/layouts/Loader";
// import UnloggedUserSidebar from "@/components/sidebar/UnloggedUserSidebar";
// import { PostInterface } from "src/entities/flow.entity";

// export default function Post() {
//   const router = useRouter();
//   const { id } = router.query;
//   const [postToDisplay, setPostToDisplay] = useState<PostInterface | null>(
//     null
//   );

//   useEffect(() => {
//     if (!id) return;
//     axios
//       .get(`/api/flow/post/${id}`)
//       .then((res) => setPostToDisplay(res.data.post))
//       .catch((err) => console.log(err));
//   }, [id]);

//   return (
//     <>
//       {postToDisplay ? (
//         <SidebarLayout
//           sidebar={
//             postToDisplay.user ? (
//               <SinglePostSidebar
//                 user={postToDisplay.user}
//                 place={postToDisplay.place}
//               />
//             ) : (
//               <UnloggedUserSidebar />
//             )
//           }
//           content={<SinglePost post={postToDisplay} />}
//         />
//       ) : (
//         <Loader />
//       )}
//     </>
//   );
// }
