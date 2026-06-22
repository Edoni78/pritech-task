import { useCallback, useMemo, useState } from 'react';

import type { TaskFormErrors, TaskFormValues } from '../types/task';
import { isFormValid, validateTaskForm } from '../utils/validation';

export function useTaskForm(initialValues: TaskFormValues) {
  const [values, setValues] = useState<TaskFormValues>(initialValues);
  const [errors, setErrors] = useState<TaskFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationErrors = useMemo(() => validateTaskForm(values), [values]);
  const canSubmit = isFormValid(validationErrors) && !isSubmitting;

  const updateField = useCallback((field: keyof TaskFormValues, text: string) => {
    setValues((prev) => ({ ...prev, [field]: text }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const handleBlur = useCallback(
    (field: keyof TaskFormValues) => {
      setErrors((prev) => {
        const next = { ...prev };
        if (validationErrors[field]) {
          next[field] = validationErrors[field];
        } else {
          delete next[field];
        }
        return next;
      });
    },
    [validationErrors],
  );

  const validateAndGetValues = useCallback(() => {
    setErrors(validationErrors);
    return validationErrors;
  }, [validationErrors]);

  return {
    values,
    errors,
    isSubmitting,
    canSubmit,
    validationErrors,
    updateField,
    handleBlur,
    validateAndGetValues,
    setIsSubmitting,
  };
}
