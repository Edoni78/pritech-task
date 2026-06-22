import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../constants/colors';
import { QUOTE_FALLBACK } from '../services/quoteApi';

type QuoteCardProps = {
  quote: string | null;
  author: string | null;
  isLoading: boolean;
  productivityScore: number;
  streak: number;
};

function MetricBadge({
  icon,
  label,
  color,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  color: string;
}) {
  return (
    <View style={styles.metricBadge}>
      <Ionicons name={icon} size={12} color={color} />
      <Text style={styles.metric}>{label}</Text>
    </View>
  );
}

export function QuoteCard({
  quote,
  author,
  isLoading,
  productivityScore,
  streak,
}: QuoteCardProps) {
  const displayQuote = quote ? `"${quote}"` : QUOTE_FALLBACK;

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.labelRow}>
          <Ionicons name="sparkles-outline" size={14} color={colors.primary} />
          <Text style={styles.label}>Daily Motivation</Text>
        </View>
        {!isLoading ? (
          <View style={styles.metrics}>
            {streak > 0 ? (
              <MetricBadge
                icon="flame-outline"
                label={`${streak} day streak`}
                color={colors.accent}
              />
            ) : null}
            <MetricBadge
              icon="trending-up-outline"
              label={`${productivityScore}% done`}
              color={colors.completed}
            />
          </View>
        ) : null}
      </View>

      {isLoading ? (
        <View style={styles.loadingRow}>
          <ActivityIndicator color={colors.primary} size="small" />
          <Text style={styles.loadingText}>Loading quote...</Text>
        </View>
      ) : (
        <>
          <Text style={styles.quote}>{displayQuote}</Text>
          {author ? <Text style={styles.author}>— {author}</Text> : null}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primaryLight,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.quoteBorder,
    gap: 8,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  metrics: {
    alignItems: 'flex-end',
    gap: 4,
  },
  metricBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metric: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  quote: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    lineHeight: 22,
  },
  author: {
    fontSize: 13,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 2,
  },
  loadingText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
});
