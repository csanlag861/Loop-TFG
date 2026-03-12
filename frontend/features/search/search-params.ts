import { createSearchParamsCache, parseAsString } from "nuqs/server";

export const searchParser = {
  search: parseAsString.withDefault("").withOptions({
    shallow: false,
    clearOnDefault: true,
  }),
};

export const usernameParser = {
  username: parseAsString.withDefault("").withOptions({
    shallow: false,
    clearOnDefault: true,
  }),
};

export const techParser = {
  tech: parseAsString.withDefault("").withOptions({
    shallow: false,
    clearOnDefault: true,
  }),
};


export const searchParamsCache = createSearchParamsCache({
  ...searchParser,
  ...usernameParser,
  ...techParser,
});

export type ParsedSearchParams = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>;
