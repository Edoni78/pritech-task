import { useCallback, useMemo } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

import { EmptyState } from '../components/EmptyState';
import { TaskForm } from '../components/TaskForm';
import { colors } from '../constants/colors';
import { useTasks } from '../context/TasksContext';
import { useTaskForm } from '../hooks/useTaskForm';
import type { RootStackParamList } from '../navigation/types';
import { isFormValid } from '../utils/validation';
import { StyleSheet, View } from 'react-native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditTask'>;
type EditRouteProp = RouteProp<RootStackParamList, 'EditTask'>;

export function EditTaskScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<EditRouteProp>();
  const { getTaskById, updateTask } = useTasks();

  const task = getTaskById(route.params.taskId);

  const initialValues = useMemo(
    () => ({
      title: task?.title ?? '',
      description: task?.description ?? '',
    }),
    [task],
  );

  const form = useTaskForm(initialValues);

  const handleSubmit = useCallback(async () => {
    if (!task) return;

    const errors = form.validateAndGetValues();
    if (!isFormValid(errors) || form.isSubmitting) return;

    form.setIsSubmitting(true);

    try {
      await updateTask(task.id, form.values.title, form.values.description);
      navigation.goBack();
    } finally {
      form.setIsSubmitting(false);
    }
  }, [task, form, updateTask, navigation]);

  if (!task) {
    return (
      <View style={styles.container}>
        <EmptyState
          title="Task not found"
          message="This task may have been deleted or is no longer available."
          actionLabel="Go Back"
          onAction={() => navigation.goBack()}
        />
      </View>
    );
  }

  return (
    <TaskForm
      values={form.values}
      errors={form.errors}
      canSubmit={form.canSubmit}
      isSubmitting={form.isSubmitting}
      submitLabel="Update Task"
      onChangeField={form.updateField}
      onBlurField={form.handleBlur}
      onSubmit={() => void handleSubmit()}
      onCancel={() => navigation.goBack()}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
