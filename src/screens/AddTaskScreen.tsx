import { useCallback, useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Button } from '../components/Button';
import { TextInputField } from '../components/TextInputField';
import { colors } from '../constants/colors';
import { useTasks } from '../context/TasksContext';
import type { RootStackParamList } from '../navigation/types';
import type { TaskFormErrors, TaskFormValues } from '../types/task';
import { isFormValid, validateTaskForm } from '../utils/validation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddTask'>;

const INITIAL_VALUES: TaskFormValues = { title: '', description: '' };

export function AddTaskScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { addTask } = useTasks();

  const [values, setValues] = useState<TaskFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<TaskFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Derived — recomputed only when values change, not on every render
  const validationErrors = useMemo(() => validateTaskForm(values), [values]);
  const canSubmit = isFormValid(validationErrors) && !isSubmitting;

  const updateField = useCallback((field: keyof TaskFormValues, text: string) => {
    setValues((prev) => ({ ...prev, [field]: text }));
    // Clear the error for this field as soon as the user starts correcting it
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const handleBlur = useCallback(
    (field: keyof TaskFormValues) => {
      setErrors((prev) => {
        const next = { ...prev };
        if (validationErrors[field]) {
          next[field] = validationErrors[field];
        } else {
          delete next[field];
        }
        return next;
      });
    },
    [validationErrors],
  );

  const handleSubmit = useCallback(async () => {
    // Show all errors on submit attempt
    setErrors(validationErrors);

    if (!isFormValid(validationErrors) || isSubmitting) return;

    setIsSubmitting(true);

    try {
      await addTask(values.title, values.description);
      navigation.goBack();
    } finally {
      setIsSubmitting(false);
    }
  }, [validationErrors, isSubmitting, addTask, values, navigation]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <TextInputField
          label="Title"
          value={values.title}
          onChangeText={(text) => updateField('title', text)}
          onBlur={() => handleBlur('title')}
          error={errors.title}
          placeholder="What do you need to do?"
        />

        <TextInputField
          label="Description"
          value={values.description}
          onChangeText={(text) => updateField('description', text)}
          onBlur={() => handleBlur('description')}
          error={errors.description}
          placeholder="Add a few details..."
          multiline
        />

        <View style={styles.actions}>
          <Button
            label="Save Task"
            onPress={() => void handleSubmit()}
            disabled={!canSubmit}
            loading={isSubmitting}
          />
          <Button
            label="Cancel"
            variant="outline"
            onPress={() => navigation.goBack()}
            disabled={isSubmitting}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    gap: 20,
  },
  actions: {
    gap: 12,
    marginTop: 8,
  },
});
