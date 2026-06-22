import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../constants/colors';
import type { TaskSortOption } from '../types/task';

const SORT_OPTIONS: { key: TaskSortOption; label: string }[] = [
  { key: 'newest', label: 'Newest first' },
  { key: 'oldest', label: 'Oldest first' },
  { key: 'status', label: 'By status' },
];

type SortDropdownProps = {
  selected: TaskSortOption;
  onSelect: (sort: TaskSortOption) => void;
};

export function SortDropdown({ selected, onSelect }: SortDropdownProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (option: TaskSortOption) => {
    onSelect(option);
    setOpen(false);
  };

  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        style={styles.trigger}
        accessibilityRole="button"
        accessibilityLabel="Sort tasks"
      >
        <Ionicons name="funnel-outline" size={14} color={colors.textSecondary} />
        <Text style={styles.triggerText}>Sort</Text>
        <Ionicons name="chevron-down" size={14} color={colors.textSecondary} />
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <View style={styles.menu}>
            {SORT_OPTIONS.map((option) => {
              const isActive = option.key === selected;

              return (
                <Pressable
                  key={option.key}
                  onPress={() => handleSelect(option.key)}
                  style={[styles.option, isActive && styles.optionActive]}
                >
                  <Text style={[styles.optionText, isActive && styles.optionTextActive]}>
                    {option.label}
                  </Text>
                  {isActive ? (
                    <Ionicons name="checkmark" size={18} color={colors.primary} />
                  ) : null}
                </Pressable>
              );
            })}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    minWidth: 72,
  },
  triggerText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.25)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 120,
    paddingRight: 16,
  },
  menu: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: 180,
    overflow: 'hidden',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  optionActive: {
    backgroundColor: colors.primaryLight,
  },
  optionText: {
    fontSize: 14,
    color: colors.text,
  },
  optionTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
});
