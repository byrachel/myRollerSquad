import { FlowRepository } from "controllers/flow.repo";

export const deletePost = async (
  userId: number,
  postId: number,
  redirect: any
) => {
  const flowRepo = new FlowRepository();
  const postIsDeleted = await flowRepo.deletePost(postId, userId);

  if (postIsDeleted.status === "SUCCESS") {
    redirect();
  }
};
