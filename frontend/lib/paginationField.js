import { PAGINATION_QUERY } from "../components/Pagination";

export default function PaginationField() {
	return {
		keyArgs: false, //tells apollo we will take care of every thing
		read(existing = [], { args, cache }) {
			console.log({ existing, args, cache });
			const { skip, first } = args;

			// Read the number of items from the page from the cache.

			const data = cache.readQuery({ query: PAGINATION_QUERY });
			const count = data?._allProductsMeta?.count;

			const page = skip / first + 1;
			const pages = Math.ceil(count / first);

			// Check if we have existing items

			const items = existing.slice(skip, skip + first).filter((x) => x);
			if (items.length && items.length !== first && page === pages) {
				// if there are items and there aren't enough items to satisfy how many were requested and we are on the last page then just send it

				return items;
			}
			if (items.length !== first) {
				// we dont have any items so we have to go to netoworrk and fetch them
				return false;
			}

			// if there are items then return the items from cache, and we don't need to go to the netowork

			if (items.length) {
				console.log(
					`There are ${items.length} items in the cache! Going to send them to apollo`
				);
			}

			// First thing it does is ask the read function for those items.
			// We can wither do one of two things.
			// First thing we can do is return the items because they are already in the cache.
			// The other thingwe can do is to return from here, (network request)
		},
		merge(existing, incoming, { args }) {
			const { skip, first } = args;
			// This runs when apollo client comes back from the network with our product.
			console.log(`Merging items from the network ${incoming.length}`);
			const merged = existing ? existing.slice(0) : [];
			for (let i = skip; i < skip + incoming.length; ++i) {
				merged[i] = incoming[i - skip];
			}
			console.log(merged);
			return merged;
		},
	};
}
