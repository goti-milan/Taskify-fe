
/* ---------- Types ---------- */

import { apiFetch } from "./api";
import { PAGINATION } from "../utils/constant";

export type TaskStatus = 'pending' | 'in_progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskResponse {
  success: boolean;
  data: Task;
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}
export interface TaskListResponse {
  success: boolean
  message: string
  data: Task[]
  meta: PaginationMeta
}

/* ---------- Query Filters ---------- */
export interface TaskFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
  sort?: 'createdAt' | 'dueDate';
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

/* ---------- API Calls ---------- */

// GET /tasks
export const fetchTasks = (filters?: TaskFilters) => {
  const defaultFilters = { limit: PAGINATION.limit, ...filters };
  return apiFetch<TaskListResponse>('tasks', { method: 'GET' }, defaultFilters);
};

// GET /tasks/:id
export const  fetchTaskById = (id: string) =>
  apiFetch<TaskResponse>(`tasks/${id}`, { method: 'GET' });

// POST /tasks
export const createTask = (payload: Partial<Task>) =>
  apiFetch<TaskResponse>('tasks', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

// PUT /tasks/:id
export const updateTask = (id: string, payload: Partial<Task>) =>
  apiFetch<TaskResponse>(`tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

// DELETE /tasks/:id
export const deleteTask = (id: string) =>
  apiFetch<{ success: boolean }>(`tasks/${id}`, {
    method: 'DELETE',
  });
