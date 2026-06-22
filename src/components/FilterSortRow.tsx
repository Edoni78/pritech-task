import { StyleSheet, Text, View } from 'react-native';

import { FilterTabs } from './FilterTabs';
import { SortDropdown } from './SortDropdown';
import type { TaskFilter, TaskSortOption } from '../types/task';

type FilterSortRowProps = {
  filter: TaskFilter;
  sort: TaskSortOption;
  onFilterChange: (filter: TaskFilter) => void;
  onSortChange: (sort: TaskSortOption) => void;
};

export function FilterSortRow({ filter, sort, onFilterChange, onSortChange }: FilterSortRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.filters}>
        <FilterTabs selected={filter} onSelect={onFilterChange} />
      </View>
      <SortDropdown selected={sort} onSelect={onSortChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  filters: {
    flex: 1,
  },
});
