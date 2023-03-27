import { CategoryInterface } from "server/core/entities/CategoryInterface";
import { CategoryRepositoryInterface } from "../../repositories/CategoryRepositoryInterface";

export class RemoveCategoryUseCase {
  constructor(
    private readonly categoryRepository: CategoryRepositoryInterface
  ) {}

  async execute(id: number): Promise<CategoryInterface> {
    return await this.categoryRepository.removeCategory(id);
  }
}
