import { Pressable, StyleSheet, Text, View } from 'react-native';

import { StatusBadge } from './StatusBadge';
import { colors } from '../constants/colors';
import type { Task } from '../types/task';
import { formatDate } from '../utils/date';

type TaskCardProps = {
  task: Task;
  onToggleStatus: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onOpenDetails: (taskId: string) => void;
};

export function TaskCard({ task, onToggleStatus, onDelete, onOpenDetails }: TaskCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {task.title}
          </Text>
          <StatusBadge completed={task.completed} />
        </View>
        <Text style={styles.date}>{formatDate(task.createdAt)}</Text>
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {task.description}
      </Text>

      <View style={styles.actions}>
        <Pressable
          onPress={() => onToggleStatus(task.id)}
          style={({ pressed }) => [styles.actionButton, pressed && styles.actionPressed]}
          accessibilityRole="button"
          accessibilityLabel={task.completed ? 'Mark as pending' : 'Mark as completed'}
        >
          <Text style={styles.actionTextPrimary}>
            {task.completed ? 'Mark Pending' : 'Mark Completed'}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => onOpenDetails(task.id)}
          style={({ pressed }) => [styles.actionButton, pressed && styles.actionPressed]}
          accessibilityRole="button"
          accessibilityLabel="View task details"
        >
          <Text style={styles.actionTextSecondary}>Details</Text>
        </Pressable>

        <Pressable
          onPress={() => onDelete(task.id)}
          style={({ pressed }) => [styles.actionButton, pressed && styles.actionPressed]}
          accessibilityRole="button"
          accessibilityLabel="Delete task"
        >
          <Text style={styles.actionTextDanger}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    gap: 12,
  },
  header: {
    gap: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  date: {
    fontSize: 13,
    color: colors.textMuted,
  },
  description: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.background,
  },
  actionPressed: {
    opacity: 0.7,
  },
  actionTextPrimary: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  actionTextSecondary: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  actionTextDanger: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.danger,
  },
});
