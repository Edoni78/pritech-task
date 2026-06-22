import { Pressable, StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import { TaskCard } from './TaskCard';
import { colors } from '../constants/colors';
import type { Task } from '../types/task';

type SwipeableTaskCardProps = {
  task: Task;
  onToggleStatus: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onOpenDetails: (taskId: string) => void;
  onEdit: (taskId: string) => void;
};

export function SwipeableTaskCard({
  task,
  onToggleStatus,
  onDelete,
  onOpenDetails,
  onEdit,
}: SwipeableTaskCardProps) {
  const renderRightActions = () => (
    <Pressable
      style={styles.deleteAction}
      onPress={() => onDelete(task.id)}
      accessibilityRole="button"
      accessibilityLabel="Delete task"
    >
      <Ionicons name="trash-outline" size={22} color={colors.surface} />
    </Pressable>
  );

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      overshootRight={false}
      friction={2}
    >
      <TaskCard
        task={task}
        onToggleStatus={onToggleStatus}
        onDelete={onDelete}
        onOpenDetails={onOpenDetails}
        onEdit={onEdit}
      />
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  deleteAction: {
    backgroundColor: colors.danger,
    justifyContent: 'center',
    alignItems: 'center',
    width: 72,
    borderRadius: 16,
    marginLeft: 8,
  },
});
