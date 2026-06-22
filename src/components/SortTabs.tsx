import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../constants/colors';
import type { TaskSortOption } from '../types/task';

const SORT_OPTIONS: { key: TaskSortOption; label: string }[] = [
  { key: 'newest', label: 'Newest' },
  { key: 'oldest', label: 'Oldest' },
  { key: 'status', label: 'Status' },
];

type SortTabsProps = {
  selected: TaskSortOption;
  onSelect: (sort: TaskSortOption) => void;
};

export function SortTabs({ selected, onSelect }: SortTabsProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Sort by</Text>
      <View style={styles.container}>
        {SORT_OPTIONS.map((option) => {
          const isActive = selected === option.key;

          return (
            <Pressable
              key={option.key}
              onPress={() => onSelect(option.key)}
              style={[styles.tab, isActive && styles.tabActive]}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: colors.surface,
  },
});
