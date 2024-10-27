import { Router } from "express";
import { createCategories, getCategories } from "../Controllers/Category";

const router = Router();

router.get("/get-categories", getCategories);

router.post("/addCategory", createCategories);

export default router;
