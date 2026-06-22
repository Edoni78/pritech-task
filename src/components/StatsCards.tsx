import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../constants/colors';

type StatsCardsProps = {
  total: number;
  completed: number;
};

export function StatsCards({ total, completed }: StatsCardsProps) {
  return (
    <View style={styles.row}>
      <View style={styles.card}>
        <Text style={styles.value}>{total}</Text>
        <Text style={styles.label}>Total</Text>
      </View>
      <View style={styles.card}>
        <Text style={[styles.value, styles.completedValue]}>{completed}</Text>
        <Text style={styles.label}>Done</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  completedValue: {
    color: colors.completed,
  },
  label: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
});
