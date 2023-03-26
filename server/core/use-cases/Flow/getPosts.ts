import { PostInterface } from "../../entities/PostInterface";
import { PostRepositoryInterface } from "../../repositories/PostRepositoryInterface";

export class GetPostsUseCase {
  constructor(private readonly postRepository: PostRepositoryInterface) {}

  async execute(cursor: number, limit: number): Promise<PostInterface[]> {
    const posts = await this.postRepository.getPosts(cursor, limit);
    return posts;
  }
}
