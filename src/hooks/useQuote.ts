import { useCallback, useEffect, useState } from 'react';

import { fetchRandomQuote } from '../services/quoteApi';

type QuoteState = {
  content: string | null;
  author: string | null;
  isLoading: boolean;
  isRefreshing: boolean;
  hasError: boolean;
  refresh: () => Promise<void>;
};

export function useQuote(): QuoteState {
  const [content, setContent] = useState<string | null>(null);
  const [author, setAuthor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasError, setHasError] = useState(false);

  const loadQuote = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    setHasError(false);

    try {
      const quote = await fetchRandomQuote();
      setContent(quote.content);
      setAuthor(quote.author);
    } catch {
      setContent(null);
      setAuthor(null);
      setHasError(true);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadQuote(false);
  }, [loadQuote]);

  const refresh = useCallback(async () => {
    await loadQuote(true);
  }, [loadQuote]);

  return { content, author, isLoading, isRefreshing, hasError, refresh };
}
