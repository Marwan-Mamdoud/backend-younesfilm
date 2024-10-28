import { Router } from "express";
import {
  createCategories,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../Controllers/Category.js";

const router = Router();

router.get("/get-categories", getCategories);

router.post("/addCategory", createCategories);

router.put("/updateCategory/:id", updateCategory);

router.delete("/deleteCategory/:id", deleteCategory);

export default router;
