import prisma from "../../prisma/db/client";
import { CategoryRepositoryInterface } from "server/core/repositories/CategoryRepositoryInterface";
import {
  CategoryInterface,
  CreateCategoryInterface,
} from "server/core/entities/CategoryInterface";

export class CategoryRepository implements CategoryRepositoryInterface {
  async getCategories(): Promise<CategoryInterface[]> {
    const categories = await prisma.category.findMany();
    return categories;
  }

  async createCategory(
    category: CreateCategoryInterface
  ): Promise<CategoryInterface> {
    const newCategory = await prisma.category.create({
      data: {
        name: category.name,
      },
    });
    return newCategory;
  }

  async updateCategory(
    category: CategoryInterface
  ): Promise<CategoryInterface> {
    const updatedCategory = await prisma.category.update({
      where: {
        id: category.id,
      },
      data: {
        name: category.name,
      },
    });
    return updatedCategory;
  }

  async removeCategory(id: number): Promise<CategoryInterface> {
    const categoryRemoved = await prisma.category.delete({
      where: { id },
    });
    return categoryRemoved;
  }
}
