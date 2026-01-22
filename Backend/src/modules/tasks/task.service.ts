import prisma from "../../config/db";

export const createTask = async (userId: number, title: string) => {
  return prisma.task.create({
    data: {
      title,
      userId,
    },
  });
};

export const getTasks = async (
  userId: number,
  page = 1,
  limit = 10,
  status?: boolean,
  search?: string,
) => {
  const where: any = { userId };

  if (status !== undefined) {
    where.status = status;
  }

  if (search) {
    where.title = {
      contains: search,
      mode: "insensitive",
    };
  }

  return prisma.task.findMany({
    where,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: "desc" },
  });
};

export const updateTask = async (
  taskId: number,
  userId: number,
  title: string,
) => {
  return prisma.task.updateMany({
    where: { id: taskId, userId },
    data: { title },
  });
};

export const deleteTask = async (taskId: number, userId: number) => {
  return prisma.task.deleteMany({
    where: { id: taskId, userId },
  });
};

export const toggleTaskStatus = async (taskId: number, userId: number) => {
  const task = await prisma.task.findFirst({
    where: { id: taskId, userId },
  });

  if (!task) throw new Error("Task not found");

  return prisma.task.update({
    where: { id: taskId },
    data: { status: !task.status },
  });
};
