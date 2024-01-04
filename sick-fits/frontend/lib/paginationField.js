import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // tells apollo that we will take care of every thing
    read(existing = [], { args, cache }) {
      const { skip, first } = args;

      //   Read the number of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;

      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // It asks the read function for the items.
      const items = existing.slice(skip, skip + first).filter((x) => x);

      if (items.length && items.length !== first && page === pages) {
        return items;
      }

      if (items.length !== first) {
        // We dont have any items, we must go to the network to fetch items
        return false;
      }

      //   If there are items return true as we dont have to go to network to feth items.

      if (items.length) {
        console.log(`There are ${items.length} items in the cache!`);
        return items;
      }

      return false;

      //   We have to do either of two things:
      // First thing we can do is we can return the items as they already exists in the cache.
      // Other thing we can do is we return false from here, which will trigger a network request.
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      // This runs after apollo client returns back with our product.
      console.log(`Merging items frm the network ${incoming.length}`);
      const merged = existing ? existing.slice(0) : [];

      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      return merged;
    },
  };
}
