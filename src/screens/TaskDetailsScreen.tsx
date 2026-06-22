import { useCallback } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

import { Button } from '../components/Button';
import { EmptyState } from '../components/EmptyState';
import { StatusBadge } from '../components/StatusBadge';
import { colors } from '../constants/colors';
import { useTasks } from '../context/TasksContext';
import type { RootStackParamList } from '../navigation/types';
import { formatDate } from '../utils/date';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'TaskDetails'>;
type DetailsRouteProp = RouteProp<RootStackParamList, 'TaskDetails'>;

export function TaskDetailsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<DetailsRouteProp>();
  const { getTaskById, toggleTaskStatus, deleteTask } = useTasks();

  const task = getTaskById(route.params.taskId);

  const handleToggle = useCallback(() => {
    if (!task) return;
    void toggleTaskStatus(task.id);
  }, [task, toggleTaskStatus]);

  const handleDelete = useCallback(() => {
    if (!task) return;

    Alert.alert(
      'Delete Task',
      `Are you sure you want to delete "${task.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            void deleteTask(task.id).then(() => navigation.goBack());
          },
        },
      ],
    );
  }, [task, deleteTask, navigation]);

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
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.title}>{task.title}</Text>

        <StatusBadge completed={task.completed} size="md" />

        <Text style={styles.meta}>Created {formatDate(task.createdAt)}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Description</Text>
          <Text style={styles.description}>{task.description}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Button
          label={task.completed ? 'Mark as Pending' : 'Mark as Completed'}
          onPress={handleToggle}
        />
        <Button label="Delete Task" variant="danger" onPress={handleDelete} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    lineHeight: 32,
  },
  meta: {
    fontSize: 14,
    color: colors.textMuted,
  },
  section: {
    gap: 8,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  actions: {
    gap: 12,
  },
});
