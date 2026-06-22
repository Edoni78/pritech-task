import type { Task } from '../types/task';

export function createTask(title: string, description: string): Task {
  return {
    id: Date.now().toString(),
    title: title.trim(),
    description: description.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };
}
