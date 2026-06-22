import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../constants/colors';
import { USER_NAME } from '../constants/user';
import { getGreeting } from '../utils/date';

type HomeHeaderProps = {
  taskCount: number;
};

export function HomeHeader({ taskCount }: HomeHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.greetingRow}>
        <Ionicons name="hand-left-outline" size={22} color={colors.primary} />
        <Text style={styles.greeting}>
          {getGreeting()}, {USER_NAME}
        </Text>
      </View>
      <View style={styles.subtitleRow}>
        <Ionicons name="list-outline" size={16} color={colors.textSecondary} />
        <Text style={styles.subtitle}>Tasks ({taskCount})</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
    paddingTop: 4,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.3,
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.textSecondary,
  },
});
