import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../constants/colors';
import type { Task } from '../types/task';
import { formatRelativeDateTime } from '../utils/date';

type TaskCardProps = {
  task: Task;
  onToggleStatus: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onOpenDetails: (taskId: string) => void;
  onEdit: (taskId: string) => void;
};

export function TaskCard({ task, onToggleStatus, onOpenDetails, onEdit }: TaskCardProps) {
  return (
    <Pressable
      onPress={() => onOpenDetails(task.id)}
      onLongPress={() => onEdit(task.id)}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      accessibilityRole="button"
      accessibilityLabel={`Open task ${task.title}`}
    >
      <View style={styles.row}>
        <Pressable
          onPress={(event) => {
            event.stopPropagation();
            onToggleStatus(task.id);
          }}
          style={[styles.checkbox, task.completed && styles.checkboxCompleted]}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: task.completed }}
          accessibilityLabel={task.completed ? 'Mark as pending' : 'Mark as completed'}
          hitSlop={8}
        >
          {task.completed ? (
            <Ionicons name="checkmark" size={16} color={colors.surface} />
          ) : null}
        </Pressable>

        <View style={styles.content}>
          <Text
            style={[styles.title, task.completed && styles.titleCompleted]}
            numberOfLines={1}
          >
            {task.title}
          </Text>

          <Text style={styles.description} numberOfLines={2}>
            {task.description}
          </Text>

          <View style={styles.metaRow}>
            <Ionicons name="time-outline" size={12} color={colors.textMuted} />
            <Text style={styles.meta}>{formatRelativeDateTime(task.createdAt)}</Text>
          </View>
        </View>

        <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },
  cardPressed: {
    opacity: 0.96,
    transform: [{ scale: 0.995 }],
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  checkboxCompleted: {
    backgroundColor: colors.completed,
    borderColor: colors.completed,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.2,
  },
  titleCompleted: {
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  meta: {
    fontSize: 12,
    color: colors.textMuted,
  },
});
