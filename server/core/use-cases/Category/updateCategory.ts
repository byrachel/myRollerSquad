import { CategoryInterface } from "../../entities/CategoryInterface";
import { CategoryRepositoryInterface } from "../../repositories/CategoryRepositoryInterface";

export class UpdateCategoryUseCase {
  constructor(
    private readonly categoryRepository: CategoryRepositoryInterface
  ) {}

  async execute(category: CategoryInterface): Promise<CategoryInterface> {
    return await this.categoryRepository.updateCategory(category);
  }
}
