import { PostInterface } from "../entities/PostInterface";
import { PostRepositoryInterface } from "../repositories/PostRepositoryInterface";

// interface GetPostsRequest {
//   cursor: number;
// }

export class GetPostsUseCase {
  constructor(private readonly postRepository: PostRepositoryInterface) {}

  async execute(): Promise<PostInterface[]> {
    const posts = await this.postRepository.getPosts();
    return posts;
  }
}
