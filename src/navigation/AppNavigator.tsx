import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AddTaskScreen } from '../screens/AddTaskScreen';
import { EditTaskScreen } from '../screens/EditTaskScreen';
import { TaskDetailsScreen } from '../screens/TaskDetailsScreen';
import { TaskListScreen } from '../screens/TaskListScreen';
import { colors } from '../constants/colors';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const screenOptions = {
  headerStyle: { backgroundColor: colors.surface },
  headerTitleStyle: {
    color: colors.text,
    fontWeight: '600' as const,
    fontSize: 18,
  },
  headerTintColor: colors.primary,
  headerShadowVisible: false,
  contentStyle: { backgroundColor: colors.background },
};

export function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="TaskList"
        component={TaskListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddTask"
        component={AddTaskScreen}
        options={{ title: 'Add Task' }}
      />
      <Stack.Screen
        name="EditTask"
        component={EditTaskScreen}
        options={{ title: 'Edit Task' }}
      />
      <Stack.Screen
        name="TaskDetails"
        component={TaskDetailsScreen}
        options={{ title: 'Task Details' }}
      />
    </Stack.Navigator>
  );
}
