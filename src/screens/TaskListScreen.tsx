import { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EmptyState } from '../components/EmptyState';
import { FilterSortRow } from '../components/FilterSortRow';
import { FloatingActionButton } from '../components/FloatingActionButton';
import { HomeHeader } from '../components/HomeHeader';
import { QuoteCard } from '../components/QuoteCard';
import { SearchField } from '../components/SearchField';
import { StatsCards } from '../components/StatsCards';
import { SwipeableTaskCard } from '../components/SwipeableTaskCard';
import { colors } from '../constants/colors';
import { useTasks } from '../context/TasksContext';
import { useQuote } from '../hooks/useQuote';
import type { RootStackParamList } from '../navigation/types';
import type { Task, TaskFilter, TaskSortOption } from '../types/task';
import { sortTasks } from '../utils/sortTasks';
import { getCompletionStreak, getTaskStats } from '../utils/stats';

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
  const insets = useSafeAreaInsets();
  const { tasks, isLoading, storageError, toggleTaskStatus, deleteTask } = useTasks();
  const quote = useQuote();

  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [sort, setSort] = useState<TaskSortOption>('newest');

  const stats = useMemo(() => getTaskStats(tasks), [tasks]);
  const streak = useMemo(() => getCompletionStreak(tasks), [tasks]);

  const displayedTasks = useMemo(() => {
    const filtered = applyFilters(tasks, searchQuery, filter);
    return sortTasks(filtered, sort);
  }, [tasks, searchQuery, filter, sort]);

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

  const handleAddTask = useCallback(() => {
    navigation.navigate('AddTask');
  }, [navigation]);

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
          message="Create your first task and stay organized."
          actionLabel="Create First Task"
          onAction={handleAddTask}
        />
      );
    }

    return (
      <EmptyState
        title="No matching tasks"
        message="Try adjusting your search or filter to find what you need."
        variant="search"
      />
    );
  }, [isLoading, tasks.length, handleAddTask]);

  const listHeader = (
    <View style={styles.listHeader}>
      <HomeHeader taskCount={tasks.length} />

      {storageError ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorBannerText}>{storageError}</Text>
        </View>
      ) : null}

      {tasks.length > 0 ? (
        <StatsCards total={stats.total} completed={stats.completed} />
      ) : null}

      <QuoteCard
        quote={quote.content}
        author={quote.author}
        isLoading={quote.isLoading}
        productivityScore={stats.productivityScore}
        streak={streak}
      />

      <SearchField value={searchQuery} onChangeText={setSearchQuery} />

      <FilterSortRow
        filter={filter}
        sort={sort}
        onFilterChange={setFilter}
        onSortChange={setSort}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedTasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.listContent,
          { paddingTop: insets.top + 8 },
          displayedTasks.length === 0 && styles.listContentEmpty,
        ]}
        ListHeaderComponent={listHeader}
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
        refreshControl={
          <RefreshControl
            refreshing={quote.isRefreshing}
            onRefresh={() => void quote.refresh()}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
        showsVerticalScrollIndicator={false}
      />

      <FloatingActionButton onPress={handleAddTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
    gap: 10,
  },
  listContentEmpty: {
    flexGrow: 1,
  },
  listHeader: {
    gap: 12,
    marginBottom: 4,
  },
  separator: {
    height: 10,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
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
