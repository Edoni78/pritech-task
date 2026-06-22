export type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
};

export type TaskFilter = 'all' | 'pending' | 'completed';

export type TaskSortOption = 'newest' | 'oldest' | 'status';

export type TaskFormValues = {
  title: string;
  description: string;
};

export type TaskFormErrors = Partial<Record<keyof TaskFormValues, string>>;
