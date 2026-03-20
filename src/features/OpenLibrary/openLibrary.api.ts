// Types
import type { PaginationResponse } from "../../utilities/api.utilities";
import type {
  OpenLibrarySearchBook,
  OpenLibrarySortTypes,
} from "./openLibrary.schema";
import {
  openLibraryBookDetailsSchema,
  openLibrarySearchResponseSchema,
} from "./openLibrary.schema";
// Constants
import { OPEN_LIBRARY_BASE_URL } from "./openLibrary.constants";
const PAGE_SIZE = 20;

export const openLibraryApi = {
  searchBooks: async (options: {
    query: string;
    sortBy?: OpenLibrarySortTypes;
  }): Promise<PaginationResponse<OpenLibrarySearchBook>> => {
    const url = new URL(`${OPEN_LIBRARY_BASE_URL}/search.json`);

    url.searchParams.append("limit", PAGE_SIZE.toString());

    if (options.query) {
      url.searchParams.append("q", encodeURIComponent(options.query));
    }

    if (options.sortBy && options.sortBy !== "default") {
      url.searchParams.append("sort", options.sortBy);
    }

    const response = await fetch(url);

    const openLibrarySearchResponse = openLibrarySearchResponseSchema.parse(
      await response.json(),
    );

    return {
      page: Math.floor(openLibrarySearchResponse.start / PAGE_SIZE) + 1,
      pageSize: PAGE_SIZE,
      totalPages: Math.ceil(openLibrarySearchResponse.numFound / PAGE_SIZE),
      items: openLibrarySearchResponse.docs || [],
    };
  },

  getBookDetails: async (key: string) => {
    try {
      const url = new URL(`${OPEN_LIBRARY_BASE_URL}${key}.json`);

      const response = await fetch(url);

      const openLibraryBookDetailsResponse = openLibraryBookDetailsSchema.parse(
        await response.json(),
      );

      return openLibraryBookDetailsResponse;
    } catch (error: unknown) {
      console.log(error);
      throw error;
    }
  },
};
