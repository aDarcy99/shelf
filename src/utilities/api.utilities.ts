export type PaginationResponse<TItem> = {
  page: number;
  pageSize: number;
  totalPages: number;
  items: Array<TItem>;
};
