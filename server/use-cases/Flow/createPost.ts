import { PostInterface } from "../../core/entities/PostInterface";
import { CreatePostInterface } from "../../core/entities/PostInterface";
import { PostRepositoryInterface } from "../../core/repositories/PostRepositoryInterface";

export class CreatePostUseCase {
  constructor(private readonly postRepository: PostRepositoryInterface) {}

  async execute(post: CreatePostInterface): Promise<PostInterface> {
    const newPost = await this.postRepository.createPost(post);
    return newPost;
  }
}
