export type Quote = {
  content: string;
  author: string;
};

const QUOTE_API_URL = 'https://api.quotable.io/random';
export const QUOTE_FALLBACK = 'Stay focused and keep building.';

export async function fetchRandomQuote(): Promise<Quote> {
  const response = await fetch(QUOTE_API_URL);

  if (!response.ok) {
    throw new Error(`Quote API responded with status ${response.status}`);
  }

  const data: unknown = await response.json();

  if (
    !data ||
    typeof data !== 'object' ||
    typeof (data as Quote).content !== 'string' ||
    typeof (data as Quote).author !== 'string'
  ) {
    throw new Error('Invalid quote response');
  }

  return {
    content: (data as Quote).content,
    author: (data as Quote).author,
  };
}
