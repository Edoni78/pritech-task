import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { colors } from '../constants/colors';
import { QUOTE_FALLBACK } from '../services/quoteApi';

type QuoteCardProps = {
  quote: string | null;
  author: string | null;
  isLoading: boolean;
  hasError: boolean;
};

export function QuoteCard({ quote, author, isLoading, hasError }: QuoteCardProps) {
  const displayQuote = hasError || !quote ? QUOTE_FALLBACK : `"${quote}"`;
  const displayAuthor = hasError || !author ? null : `— ${author}`;

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Daily motivation</Text>
      {isLoading ? (
        <View style={styles.loadingRow}>
          <ActivityIndicator color={colors.primary} size="small" />
          <Text style={styles.loadingText}>Loading quote...</Text>
        </View>
      ) : (
        <>
          <Text style={styles.quote}>{displayQuote}</Text>
          {displayAuthor ? <Text style={styles.author}>{displayAuthor}</Text> : null}
          {hasError ? (
            <Text style={styles.fallbackNote}>Showing fallback message</Text>
          ) : null}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primaryLight,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    gap: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  quote: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    lineHeight: 24,
  },
  author: {
    fontSize: 14,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  loadingText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  fallbackNote: {
    fontSize: 12,
    color: colors.textMuted,
  },
});
