import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const createTaskSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  dueDate: z.string().optional()
});

const updateTaskSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  dueDate: z.string().optional()
});

export const getTasks = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { id } = req.params;
    
    const task = await prisma.task.findFirst({
      where: { id: Number(id), userId }
    });
    
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch task' });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const validatedData = createTaskSchema.parse(req.body);
    
    const task = await prisma.task.create({
      data: {
        ...validatedData,
        dueDate: validatedData.dueDate ? new Date(validatedData.dueDate) : null,
        userId
      }
    });
    
    res.status(201).json(task);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Failed to create task' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { id } = req.params;
    const validatedData = updateTaskSchema.parse(req.body);
    
    const existingTask = await prisma.task.findFirst({
      where: { id: Number(id), userId }
    });
    
    if (!existingTask) return res.status(404).json({ error: 'Task not found' });
    
    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: {
        ...validatedData,
        dueDate: validatedData.dueDate ? new Date(validatedData.dueDate) : null
      }
    });
    
    res.json(task);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Failed to update task' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { id } = req.params;
    
    const existingTask = await prisma.task.findFirst({
      where: { id: Number(id), userId }
    });
    
    if (!existingTask) return res.status(404).json({ error: 'Task not found' });
    
    await prisma.task.delete({ where: { id: Number(id) } });
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};