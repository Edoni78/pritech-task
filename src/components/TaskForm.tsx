import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';

import { Button } from './Button';
import { TextInputField } from './TextInputField';
import { colors } from '../constants/colors';
import type { TaskFormErrors, TaskFormValues } from '../types/task';

type TaskFormProps = {
  values: TaskFormValues;
  errors: TaskFormErrors;
  canSubmit: boolean;
  isSubmitting: boolean;
  submitLabel: string;
  onChangeField: (field: keyof TaskFormValues, text: string) => void;
  onBlurField: (field: keyof TaskFormValues) => void;
  onSubmit: () => void;
  onCancel: () => void;
};

export function TaskForm({
  values,
  errors,
  canSubmit,
  isSubmitting,
  submitLabel,
  onChangeField,
  onBlurField,
  onSubmit,
  onCancel,
}: TaskFormProps) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <TextInputField
          label="Title"
          value={values.title}
          onChangeText={(text) => onChangeField('title', text)}
          onBlur={() => onBlurField('title')}
          error={errors.title}
          placeholder="What do you need to do?"
        />

        <TextInputField
          label="Description"
          value={values.description}
          onChangeText={(text) => onChangeField('description', text)}
          onBlur={() => onBlurField('description')}
          error={errors.description}
          placeholder="Add a few details..."
          multiline
        />

        <View style={styles.actions}>
          <Button
            label={submitLabel}
            onPress={onSubmit}
            disabled={!canSubmit}
            loading={isSubmitting}
          />
          <Button
            label="Cancel"
            variant="outline"
            onPress={onCancel}
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
