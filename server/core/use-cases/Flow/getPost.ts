import { PostInterface } from "../../entities/PostInterface";
import { PostRepositoryInterface } from "../../repositories/PostRepositoryInterface";

export class GetPostUseCase {
  constructor(private readonly postRepository: PostRepositoryInterface) {}

  async execute(id: number): Promise<PostInterface | null> {
    const post = await this.postRepository.getPost(id);
    return post;
  }
}
