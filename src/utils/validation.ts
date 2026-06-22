import type { TaskFormErrors, TaskFormValues } from '../types/task';

export function validateTaskForm(values: TaskFormValues): TaskFormErrors {
  const errors: TaskFormErrors = {};

  if (!values.title.trim()) {
    errors.title = 'Title is required';
  }

  if (!values.description.trim()) {
    errors.description = 'Description is required';
  }

  return errors;
}

export function isFormValid(errors: TaskFormErrors): boolean {
  return Object.keys(errors).length === 0;
}
