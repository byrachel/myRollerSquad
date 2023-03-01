import { GetPostsUseCase } from "../use-cases/getPosts";

export class PostController {
  private getPosts: GetPostsUseCase;
  constructor(getPosts: GetPostsUseCase) {
    this.getPosts = getPosts;
  }
  async getAll(): Promise<any> {
    try {
      //   const cursor = req.params.cursor ? parseInt(req.params.cursor) : 0;
      const posts = await this.getPosts.execute();
      return posts;
    } catch (err) {
      return null;
    }
  }
}
