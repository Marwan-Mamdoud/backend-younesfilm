import { Router } from "express";
import {
  createCategories,
  deleteCategory,
  getCategories,
  getCategoriesByName,
  updateCategory,
} from "../Controllers/Category.js";

const router = Router();

router.get("/get-categories", getCategories);

router.get("/get-categories/:name", getCategoriesByName);

router.post("/addCategory", createCategories);

router.put("/updateCategory/:id", updateCategory);

router.delete("/deleteCategory/:id", deleteCategory);

export default router;
