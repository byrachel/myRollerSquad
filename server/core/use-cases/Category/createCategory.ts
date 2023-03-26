import {
  CategoryInterface,
  CreateCategoryInterface,
} from "../../entities/CategoryInterface";
import { CategoryRepositoryInterface } from "../../repositories/CategoryRepositoryInterface";

export class CreateCategoryUseCase {
  constructor(
    private readonly categoryRepository: CategoryRepositoryInterface
  ) {}

  async execute(category: CreateCategoryInterface): Promise<CategoryInterface> {
    return await this.categoryRepository.createCategory(category);
  }
}
