import express, { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import {
  getStyles,
  addStyle,
  editStyle,
  removeStyle,
} from "../core/controllers/admin.controllers";
import { CategoryRepository } from "../infrastructure/repositories/Admin/CategoryRepository";
import { GetCategoriesUseCase } from "../core/use-cases/Category/getCategories";
import { CategoryController } from "../core/controllers/CategoryController";
import { CreateCategoryUseCase } from "../core/use-cases/Category/createCategory";
import { RemoveCategoryUseCase } from "../core/use-cases/Category/removeCategory";
import { UpdateCategoryUseCase } from "../core/use-cases/Category/updateCategory";
import { isAdmin } from "../infrastructure/middleware/isAdmin";

const adminRouter = express.Router();

const categoryRepository = new CategoryRepository();
const getCategoriesUseCase = new GetCategoriesUseCase(categoryRepository);
const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
const removeCategoryUseCase = new RemoveCategoryUseCase(categoryRepository);
const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository);
const categoryController = new CategoryController(
  getCategoriesUseCase,
  createCategoryUseCase,
  updateCategoryUseCase,
  removeCategoryUseCase
);

adminRouter.get(
  "/api/admin/categories",
  isAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    const categories = await categoryController.getCategories();
    if (!categories) {
      return next("Something went wrong : categories are not fetched");
    }
    return res.status(200).json({ categories });
  }
);

adminRouter.post(
  "/api/admin/category",
  check("name").exists().trim(),
  async (req: Request, res: Response) => {
    const newCategory = await categoryController.createCategory({
      name: req.body.name,
    });
    if (!newCategory) {
      return res.status(500);
    }
    return res.status(201).json({ category: newCategory });
  }
);

adminRouter.put(
  "/api/admin/category",
  check("name").exists().trim(),
  check("id").exists().isNumeric(),
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.id && req.body.name) {
      const updatedCategory = await categoryController.updateCategory(req.body);
      if (updatedCategory) {
        return res.status(200).json({ category: updatedCategory });
      }
      next("Something went wrong : category is not updated");
    } else {
      next("Name or id is missing");
    }
  }
);

adminRouter.delete(
  "/api/admin/category/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    if (!id) return next("id is missing");
    const categoryIsRemoved = await categoryController.removeCategory(id);
    if (!categoryIsRemoved) {
      return next("Something went wrong : category is not removed");
    }
    return res.status(200).json({ category: categoryIsRemoved });
  }
);

adminRouter.get("/api/admin/styles", getStyles);
adminRouter.post("/api/admin/style", addStyle);
adminRouter.put("/api/admin/style", editStyle);
adminRouter.delete("/api/admin/style/:id", removeStyle);

export default adminRouter;
