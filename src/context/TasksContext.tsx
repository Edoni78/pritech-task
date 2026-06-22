import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { loadTasks, saveTasks } from '../services/taskStorage';
import { createTask } from '../utils/task';
import type { Task } from '../types/task';

type TasksContextValue = {
  tasks: Task[];
  isLoading: boolean;
  storageError: string | null;
  addTask: (title: string, description: string) => Promise<void>;
  toggleTaskStatus: (taskId: string) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  getTaskById: (taskId: string) => Task | undefined;
};

const TasksContext = createContext<TasksContextValue | null>(null);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [storageError, setStorageError] = useState<string | null>(null);

  // Load persisted tasks on mount
  useEffect(() => {
    let isMounted = true;

    async function hydrateTasks() {
      try {
        const storedTasks = await loadTasks();
        if (isMounted) {
          setTasks(storedTasks);
          setStorageError(null);
        }
      } catch {
        if (isMounted) {
          setStorageError('Unable to load saved tasks. Changes may not persist.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    hydrateTasks();

    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * Persist the latest task list to AsyncStorage.
   * On failure, sets storageError so the UI can display a non-blocking warning.
   */
  const persistTasks = useCallback(async (nextTasks: Task[]) => {
    try {
      await saveTasks(nextTasks);
      setStorageError(null);
    } catch {
      setStorageError('Unable to save changes. Please try again.');
    }
  }, []);

  const addTask = useCallback(
    async (title: string, description: string) => {
      const newTask = createTask(title, description);
      const nextTasks = [newTask, ...tasks];
      setTasks(nextTasks);
      await persistTasks(nextTasks);
    },
    [persistTasks, tasks],
  );

  const toggleTaskStatus = useCallback(
    async (taskId: string) => {
      const nextTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      );
      setTasks(nextTasks);
      await persistTasks(nextTasks);
    },
    [persistTasks, tasks],
  );

  const deleteTask = useCallback(
    async (taskId: string) => {
      const nextTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(nextTasks);
      await persistTasks(nextTasks);
    },
    [persistTasks, tasks],
  );

  const getTaskById = useCallback(
    (taskId: string) => tasks.find((task) => task.id === taskId),
    [tasks],
  );

  const value = useMemo<TasksContextValue>(
    () => ({
      tasks,
      isLoading,
      storageError,
      addTask,
      toggleTaskStatus,
      deleteTask,
      getTaskById,
    }),
    [tasks, isLoading, storageError, addTask, toggleTaskStatus, deleteTask, getTaskById],
  );

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}

export function useTasks(): TasksContextValue {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider');
  }

  return context;
}
