import { StyleSheet, View } from 'react-native';

import { colors } from '../constants/colors';

export function EmptyIllustration() {
  return (
    <View style={styles.container}>
      <View style={styles.backCard} />
      <View style={styles.frontCard}>
        <View style={styles.lineLong} />
        <View style={styles.lineMedium} />
        <View style={styles.lineShort} />
        <View style={styles.checkRow}>
          <View style={styles.checkbox} />
          <View style={styles.lineTiny} />
        </View>
      </View>
      <View style={styles.badge}>
        <View style={styles.plusVertical} />
        <View style={styles.plusHorizontal} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  backCard: {
    position: 'absolute',
    width: 88,
    height: 72,
    borderRadius: 14,
    backgroundColor: colors.primarySoft,
    transform: [{ rotate: '-8deg' }, { translateX: -12 }],
  },
  frontCard: {
    width: 96,
    height: 80,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    gap: 8,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  lineLong: {
    height: 6,
    width: '100%',
    borderRadius: 3,
    backgroundColor: colors.border,
  },
  lineMedium: {
    height: 6,
    width: '75%',
    borderRadius: 3,
    backgroundColor: colors.border,
  },
  lineShort: {
    height: 6,
    width: '50%',
    borderRadius: 3,
    backgroundColor: colors.border,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
  },
  checkbox: {
    width: 14,
    height: 14,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  lineTiny: {
    height: 6,
    flex: 1,
    borderRadius: 3,
    backgroundColor: colors.primarySoft,
  },
  badge: {
    position: 'absolute',
    right: 8,
    bottom: 4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusVertical: {
    position: 'absolute',
    width: 2,
    height: 12,
    borderRadius: 1,
    backgroundColor: colors.surface,
  },
  plusHorizontal: {
    position: 'absolute',
    width: 12,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.surface,
  },
});
