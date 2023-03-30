import { PostInterface } from "../../entities/PostInterface";
import { CreatePostInterface } from "../../entities/PostInterface";
import { PostRepositoryInterface } from "../../repositories/PostRepositoryInterface";

export class CreatePostUseCase {
  constructor(private readonly postRepository: PostRepositoryInterface) {}

  async execute(post: CreatePostInterface): Promise<PostInterface | null> {
    return await this.postRepository.createPost(post);
  }
}