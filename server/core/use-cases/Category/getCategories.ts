import { CategoryInterface } from "server/core/entities/CategoryInterface";
import { CategoryRepositoryInterface } from "../../repositories/CategoryRepositoryInterface";

export class GetCategoriesUseCase {
  constructor(
    private readonly categoryRepository: CategoryRepositoryInterface
  ) {}

  async execute(): Promise<CategoryInterface[]> {
    return await this.categoryRepository.getCategories();
  }
}
