export interface Pages {
  object: string;
  results: Array<{ [key: string]: any }>;
  nextCursor: number;
  hasMore: boolean;
  type: string;
  pageOrDatabase: { [key: string]: any };
}
