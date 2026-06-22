import type { Task } from '../types/task';

export function getTaskStats(tasks: Task[]) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = total - completed;
  const productivityScore = total === 0 ? 0 : Math.round((completed / total) * 100);

  return { total, completed, pending, productivityScore };
}

/** Count consecutive days (including today) with at least one completed task. */
export function getCompletionStreak(tasks: Task[]): number {
  const completedDays = new Set<string>();

  for (const task of tasks) {
    if (!task.completed) continue;

    const date = new Date(task.createdAt);
    if (Number.isNaN(date.getTime())) continue;

    completedDays.add(date.toISOString().slice(0, 10));
  }

  if (completedDays.size === 0) return 0;

  let streak = 0;
  const cursor = new Date();

  while (true) {
    const key = cursor.toISOString().slice(0, 10);
    if (!completedDays.has(key)) break;
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}
