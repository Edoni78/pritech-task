import { StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../constants/colors';

type SearchFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
};

export function SearchField({ value, onChangeText }: SearchFieldProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={18} color={colors.textMuted} style={styles.icon} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search tasks..."
        placeholderTextColor={colors.textMuted}
        style={styles.input}
        clearButtonMode="while-editing"
        accessibilityLabel="Search tasks by title"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    minHeight: 42,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    paddingVertical: 8,
  },
});
