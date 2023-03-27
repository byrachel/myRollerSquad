import {
  CategoryInterface,
  CreateCategoryInterface,
} from "../entities/CategoryInterface";
import { CreateCategoryUseCase } from "../use-cases/Category/createCategory";
import { GetCategoriesUseCase } from "../use-cases/Category/getCategories";
import { RemoveCategoryUseCase } from "../use-cases/Category/removeCategory";
import { UpdateCategoryUseCase } from "../use-cases/Category/updateCategory";

export class CategoryController {
  private getCategoriesUseCase: GetCategoriesUseCase;
  private createCategoryUseCase: CreateCategoryUseCase;
  private updateCategoryUseCase: UpdateCategoryUseCase;
  private removeCategoryUseCase: RemoveCategoryUseCase;

  constructor(
    getCategoriesUseCase: GetCategoriesUseCase,
    createCategoryUseCase: CreateCategoryUseCase,
    updateCategoryUseCase: UpdateCategoryUseCase,
    removeCategoryUseCase: RemoveCategoryUseCase
  ) {
    this.getCategoriesUseCase = getCategoriesUseCase;
    this.createCategoryUseCase = createCategoryUseCase;
    this.updateCategoryUseCase = updateCategoryUseCase;
    this.removeCategoryUseCase = removeCategoryUseCase;
  }
  async getCategories(): Promise<CategoryInterface[] | null> {
    try {
      return await this.getCategoriesUseCase.execute();
    } catch (error) {
      return null;
    }
  }

  async createCategory(
    category: CreateCategoryInterface
  ): Promise<CategoryInterface | null> {
    try {
      return await this.createCategoryUseCase.execute(category);
    } catch (error) {
      return null;
    }
  }

  async updateCategory(
    category: CategoryInterface
  ): Promise<CategoryInterface | null> {
    try {
      return await this.updateCategoryUseCase.execute(category);
    } catch (error) {
      return null;
    }
  }

  async removeCategory(id: number): Promise<CategoryInterface | null> {
    try {
      return await this.removeCategoryUseCase.execute(id);
    } catch (error) {
      return null;
    }
  }
}
