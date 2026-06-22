import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../constants/colors';
import type { TaskFilter } from '../types/task';

const FILTERS: { key: TaskFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'completed', label: 'Completed' },
];

type FilterTabsProps = {
  selected: TaskFilter;
  onSelect: (filter: TaskFilter) => void;
};

export function FilterTabs({ selected, onSelect }: FilterTabsProps) {
  return (
    <View style={styles.container}>
      {FILTERS.map((filter) => {
        const isActive = selected === filter.key;

        return (
          <Pressable
            key={filter.key}
            onPress={() => onSelect(filter.key)}
            style={[styles.tab, isActive && styles.tabActive]}
          >
            <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
              {filter.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
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
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: colors.surface,
  },
});
