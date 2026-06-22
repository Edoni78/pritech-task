import { useEffect, useState } from 'react';

import { fetchRandomQuote } from '../services/quoteApi';

type QuoteState = {
  content: string | null;
  author: string | null;
  isLoading: boolean;
  hasError: boolean;
};

const initialState: QuoteState = {
  content: null,
  author: null,
  isLoading: true,
  hasError: false,
};

export function useQuote(): QuoteState {
  const [state, setState] = useState<QuoteState>(initialState);

  useEffect(() => {
    let isMounted = true;

    async function loadQuote() {
      setState((prev) => ({ ...prev, isLoading: true, hasError: false }));

      try {
        const quote = await fetchRandomQuote();

        if (isMounted) {
          setState({ content: quote.content, author: quote.author, isLoading: false, hasError: false });
        }
      } catch {
        if (isMounted) {
          setState({ content: null, author: null, isLoading: false, hasError: true });
        }
      }
    }

    loadQuote();

    return () => {
      isMounted = false;
    };
  }, []);

  return state;
}
