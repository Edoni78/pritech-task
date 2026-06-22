import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { EmptyState } from '../components/EmptyState';
import { FilterTabs } from '../components/FilterTabs';
import { QuoteCard } from '../components/QuoteCard';
import { SortTabs } from '../components/SortTabs';
import { SwipeableTaskCard } from '../components/SwipeableTaskCard';
import { colors } from '../constants/colors';
import { useTasks } from '../context/TasksContext';
import { useQuote } from '../hooks/useQuote';
import type { RootStackParamList } from '../navigation/types';
import type { Task, TaskFilter, TaskSortOption } from '../types/task';
import { sortTasks } from '../utils/sortTasks';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'TaskList'>;

function applyFilters(tasks: Task[], query: string, filter: TaskFilter): Task[] {
  const normalizedQuery = query.trim().toLowerCase();

  return tasks.filter((task) => {
    const matchesStatus =
      filter === 'all' ||
      (filter === 'completed' && task.completed) ||
      (filter === 'pending' && !task.completed);

    const matchesSearch =
      normalizedQuery.length === 0 ||
      task.title.toLowerCase().includes(normalizedQuery);

    return matchesStatus && matchesSearch;
  });
}

const Separator = () => <View style={styles.separator} />;

export function TaskListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { tasks, isLoading, storageError, toggleTaskStatus, deleteTask } = useTasks();
  const quote = useQuote();

  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [sort, setSort] = useState<TaskSortOption>('newest');

  const displayedTasks = useMemo(() => {
    const filtered = applyFilters(tasks, searchQuery, filter);
    return sortTasks(filtered, sort);
  }, [tasks, searchQuery, filter, sort]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text
          onPress={() => navigation.navigate('AddTask')}
          style={styles.headerAction}
          accessibilityRole="button"
        >
          Add Task
        </Text>
      ),
    });
  }, [navigation]);

  const handleDelete = useCallback(
    (taskId: string) => {
      const task = tasks.find((t) => t.id === taskId);

      Alert.alert(
        'Delete Task',
        `Are you sure you want to delete "${task?.title ?? 'this task'}"?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => void deleteTask(taskId),
          },
        ],
      );
    },
    [deleteTask, tasks],
  );

  const handleToggle = useCallback(
    (taskId: string) => void toggleTaskStatus(taskId),
    [toggleTaskStatus],
  );

  const handleOpenDetails = useCallback(
    (taskId: string) => navigation.navigate('TaskDetails', { taskId }),
    [navigation],
  );

  const handleEdit = useCallback(
    (taskId: string) => navigation.navigate('EditTask', { taskId }),
    [navigation],
  );

  const listEmptyComponent = useMemo(() => {
    if (isLoading) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading tasks...</Text>
        </View>
      );
    }

    if (tasks.length === 0) {
      return (
        <EmptyState
          title="No tasks yet"
          message="Create your first task to start organizing your day."
          actionLabel="Add Task"
          onAction={() => navigation.navigate('AddTask')}
        />
      );
    }

    return (
      <EmptyState
        title="No matching tasks"
        message="Try adjusting your search or filter to find what you need."
      />
    );
  }, [isLoading, tasks.length, navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedTasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.listContent,
          displayedTasks.length === 0 && styles.listContentEmpty,
        ]}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            {storageError ? (
              <View style={styles.errorBanner}>
                <Text style={styles.errorBannerText}>{storageError}</Text>
              </View>
            ) : null}

            <QuoteCard
              quote={quote.content}
              author={quote.author}
              isLoading={quote.isLoading}
              hasError={quote.hasError}
            />

            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search by title..."
              placeholderTextColor={colors.textMuted}
              style={styles.searchInput}
              clearButtonMode="while-editing"
              accessibilityLabel="Search tasks by title"
            />

            <FilterTabs selected={filter} onSelect={setFilter} />
            <SortTabs selected={sort} onSelect={setSort} />
          </View>
        }
        renderItem={({ item }) => (
          <SwipeableTaskCard
            task={item}
            onToggleStatus={handleToggle}
            onDelete={handleDelete}
            onOpenDetails={handleOpenDetails}
            onEdit={handleEdit}
          />
        )}
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={listEmptyComponent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  listContentEmpty: {
    flexGrow: 1,
  },
  listHeader: {
    gap: 16,
    marginBottom: 4,
  },
  headerAction: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 4,
  },
  searchInput: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
  },
  separator: {
    height: 12,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    gap: 12,
  },
  loadingText: {
    fontSize: 15,
    color: colors.textSecondary,
  },
  errorBanner: {
    backgroundColor: colors.dangerLight,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.dangerBorder,
  },
  errorBannerText: {
    color: colors.danger,
    fontSize: 14,
    lineHeight: 20,
  },
});
