// Typess
import { openLibraryApi } from "./openLibrary.api";
import type { OpenLibrarySortTypes } from "./openLibrary.schema";
// Functions
import { queryOptions } from "@tanstack/react-query";

const openLibraryKeys = {
  openLibrary: "openLibrary",
  lists: () => [openLibraryKeys.openLibrary, "lists"],
  list: (params: {
    query: string;
    page: number;
    sortBy?: OpenLibrarySortTypes;
  }) => [...openLibraryKeys.lists(), params],
  details: () => [openLibraryKeys.openLibrary, "details"],
  detail: (key: string) => [...openLibraryKeys.details(), key],
};

export const openLibraryQueries = {
  searchBooks: (params: {
    query: string;
    page: number;
    sortBy?: OpenLibrarySortTypes;
  }) => {
    return queryOptions({
      queryKey: openLibraryKeys.list(params),
      queryFn: () => openLibraryApi.searchBooks(params),
    });
  },

  getBookDetailsByKey: (params: { key: string }) => {
    return queryOptions({
      queryKey: openLibraryKeys.detail(params.key),
      queryFn: () => openLibraryApi.getBookDetails(params.key),
      enabled: !!params.key,
    });
  },
};
