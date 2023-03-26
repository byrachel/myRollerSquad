import {
  CategoryInterface,
  CreateCategoryInterface,
} from "../entities/CategoryInterface";

export interface CategoryRepositoryInterface {
  getCategories(): Promise<CategoryInterface[]>;
  createCategory(category: CreateCategoryInterface): Promise<CategoryInterface>;
  updateCategory(category: CategoryInterface): Promise<CategoryInterface>;
  removeCategory(id: number): Promise<CategoryInterface>;
}
