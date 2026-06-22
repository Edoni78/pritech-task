import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../constants/colors';

type StatusBadgeProps = {
  completed: boolean;
  size?: 'sm' | 'md';
};

export function StatusBadge({ completed, size = 'sm' }: StatusBadgeProps) {
  return (
    <View style={[styles.badge, completed ? styles.completedBg : styles.pendingBg]}>
      <Text
        style={[
          styles.text,
          size === 'md' && styles.textMd,
          completed ? styles.completedText : styles.pendingText,
        ]}
      >
        {completed ? 'Completed' : 'Pending'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  completedBg: {
    backgroundColor: colors.completedBg,
  },
  pendingBg: {
    backgroundColor: colors.pendingBg,
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
  },
  textMd: {
    fontSize: 13,
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  completedText: {
    color: colors.completed,
  },
  pendingText: {
    color: colors.pending,
  },
});
