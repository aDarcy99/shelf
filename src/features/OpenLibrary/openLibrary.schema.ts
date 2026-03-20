import z from "zod";

// For full list of sort types goto: https://github.com/internetarchive/openlibrary/blob/b4afa14b0981ae1785c26c71908af99b879fa975/openlibrary/plugins/worksearch/schemes/works.py#L119-L153
export const openLibrarySortTypesSchema = z.enum([
  "default", // Default is not defined in sort types, used to ignore sortby option.
  "old",
  "new",
  "editions",
]);

export const openLibrarySearchBookSchema = z.object({
  key: z.string(),
  title: z.string(),
  author_name: z.array(z.string()).optional(),
  first_publish_year: z.number().optional(),
  edition_count: z.number().optional(),
  cover_i: z.number().optional(),
});

export const openLibrarySearchResponseSchema = z.object({
  documentation_url: z.string(),
  offset: z.number().nullable(),
  start: z.number(),
  numFound: z.number(),
  numFoundExact: z.boolean(),
  docs: z.array(openLibrarySearchBookSchema).optional(),
  q: z.string(),
});

const openLibraryKeySchema = z.object({
  key: z.string(),
});

const openLibraryDescriptionSchema = z.union([
  z.object({
    type: z.literal("/type/text"),
    value: z.string(),
  }),
  z.string(),
]);

const openLibraryDateTimeSchema = z.object({
  type: z.literal("/type/datetime"),
  value: z.coerce.date(),
});

const openLibraryLinkSchema = z.object({
  title: z.string(),
  url: z.url(),
  type: openLibraryKeySchema,
});

const openLibraryAuthorRoleSchema = z.object({
  author: openLibraryKeySchema,
  type: openLibraryKeySchema,
});

export const openLibraryBookDetailsSchema = z.looseObject({
  key: z.string(),
  type: openLibraryKeySchema,
  title: z.string(),
  description: openLibraryDescriptionSchema.optional(),
  covers: z.array(z.number()).optional(),
  subjects: z.array(z.string()).optional(),
  authors: z.array(openLibraryAuthorRoleSchema).optional(),
  links: z.array(openLibraryLinkSchema).optional(),
  latest_revision: z.int(),
  revision: z.int(),
  created: openLibraryDateTimeSchema,
  last_modified: openLibraryDateTimeSchema,
});

export type OpenLibrarySortTypes = z.infer<typeof openLibrarySortTypesSchema>;
export type OpenLibrarySearchBook = z.infer<typeof openLibrarySearchBookSchema>;
export type OpenLibrarySearchResponse = z.infer<
  typeof openLibrarySearchResponseSchema
>;
export type OpenLibraryBookDetailsResponse = z.infer<
  typeof openLibraryBookDetailsSchema
>;
