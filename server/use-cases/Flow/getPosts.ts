import { PostInterface } from "../../core/entities/PostInterface";
import { PostRepositoryInterface } from "../../core/repositories/PostRepositoryInterface";

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
