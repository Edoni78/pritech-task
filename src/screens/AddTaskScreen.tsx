import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { TaskForm } from '../components/TaskForm';
import { useTasks } from '../context/TasksContext';
import { useTaskForm } from '../hooks/useTaskForm';
import type { RootStackParamList } from '../navigation/types';
import { isFormValid } from '../utils/validation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddTask'>;

const INITIAL_VALUES = { title: '', description: '' };

export function AddTaskScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { addTask } = useTasks();
  const form = useTaskForm(INITIAL_VALUES);

  const handleSubmit = useCallback(async () => {
    const errors = form.validateAndGetValues();
    if (!isFormValid(errors) || form.isSubmitting) return;

    form.setIsSubmitting(true);

    try {
      await addTask(form.values.title, form.values.description);
      navigation.goBack();
    } finally {
      form.setIsSubmitting(false);
    }
  }, [form, addTask, navigation]);

  return (
    <TaskForm
      values={form.values}
      errors={form.errors}
      canSubmit={form.canSubmit}
      isSubmitting={form.isSubmitting}
      submitLabel="Save Task"
      onChangeField={form.updateField}
      onBlurField={form.handleBlur}
      onSubmit={() => void handleSubmit()}
      onCancel={() => navigation.goBack()}
    />
  );
}
