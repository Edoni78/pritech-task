import type { Task, TaskSortOption } from '../types/task';

export function sortTasks(tasks: Task[], sort: TaskSortOption): Task[] {
  const sorted = [...tasks];

  switch (sort) {
    case 'oldest':
      return sorted.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    case 'status':
      // Pending first, then completed; within each group, newest first
      return sorted.sort((a, b) => {
        if (a.completed !== b.completed) {
          return Number(a.completed) - Number(b.completed);
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
    case 'newest':
    default:
      return sorted.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }
}
