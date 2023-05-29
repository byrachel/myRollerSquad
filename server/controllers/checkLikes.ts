export const isAlreadyLikedByThisUser = (
  user_likes: { user_id: number }[],
  user_id: number
) => {
  const postLikes =
    user_likes.length > 0
      ? user_likes.map((like: { user_id: number }) => like.user_id)
      : [];
  const postLikedByThisUser =
    user_likes.length > 0 ? postLikes.includes(user_id) : false;
  return postLikedByThisUser;
};
