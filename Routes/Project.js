import { Router } from "express";
import {
  addProject,
  deleteImage,
  deleteProject,
  getProject,
  getProjects,
  getProjectsByCategory,
  getsortd,
  sortedProjects,
  updatePorject,
} from "../Controllers/Project.js";
import {
  createUser,
  deleteUsers,
  getUser,
  getUsers,
  updateUser,
} from "../Controllers/Users.js";
const router = Router();

router.get("/get-projects", getProjects);

router.get("/get-projects/:category", getProjectsByCategory);

router.get("/get-sorted", getsortd);

router.post("/addProject", addProject);

router.get("/get-project/:id", getProject);

router.put("/updateProject/:id", updatePorject);

router.put("/deleteImage/:id", deleteImage);

router.delete("/delete-project/:id", deleteProject);

router.put("/sortedProjects", sortedProjects);

router.get("/get-users", getUsers);

router.get("/get-user/:id", getUser);

router.post("/create-user", createUser);

router.put("/update-user/:id", updateUser);

router.delete("/delete-user/:id", deleteUsers);

export default router;
