import { Request, Response } from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  toggleTaskStatus,
} from "./task.service";

export const addTask = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const userId = (req as any).user.id;

    const task = await createTask(userId, title);
    res.status(201).json(task);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const listTasks = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { page, limit, status, search } = req.query;

    const tasks = await getTasks(
      userId,
      Number(page) || 1,
      Number(limit) || 10,
      status !== undefined ? status === "true" : undefined,
      search as string,
    );

    res.json(tasks);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const editTask = async (req: Request, res: Response) => {
  try {
    const taskId = Number(req.params.id);
    const { title } = req.body;
    const userId = (req as any).user.id;

    await updateTask(taskId, userId, title);
    res.json({ message: "Task updated" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const removeTask = async (req: Request, res: Response) => {
  try {
    const taskId = Number(req.params.id);
    const userId = (req as any).user.id;

    await deleteTask(taskId, userId);
    res.json({ message: "Task deleted" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const toggleTask = async (req: Request, res: Response) => {
  try {
    const taskId = Number(req.params.id);
    const userId = (req as any).user.id;

    const task = await toggleTaskStatus(taskId, userId);
    res.json(task);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
