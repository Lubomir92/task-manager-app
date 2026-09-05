export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate?: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate?: string;
}