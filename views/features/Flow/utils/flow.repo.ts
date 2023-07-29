import http from "views/utils/interceptor/http";
import { FlowUseCase, ResponseInterface } from "./flow.usecases";

export class FlowRepo implements FlowUseCase {
  async getPosts(
    nextId: number,
    category: string,
    style: string
  ): Promise<ResponseInterface> {
    const posts = http({
      method: "get",
      url: `flow/posts/${nextId}?${category}&${style}`,
    })
      .then((res: any) => {
        return {
          status: "SUCCESS",
          posts: res.data.posts,
          cursor: res.data.nextId,
        };
      })
      .catch(() => {
        return { status: "ERROR", posts: [], cursor: null };
      });
    return posts;
  }
}
