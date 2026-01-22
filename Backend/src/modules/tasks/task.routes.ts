import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import {
  addTask,
  listTasks,
  editTask,
  removeTask,
  toggleTask,
} from "./task.controller";

const router = Router();

router.use(authMiddleware);

router.post("/", addTask);
router.get("/", listTasks);
router.patch("/:id", editTask);
router.delete("/:id", removeTask);
router.patch("/:id/toggle", toggleTask);

export default router;
