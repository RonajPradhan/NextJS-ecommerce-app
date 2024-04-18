import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

export const CURRENT_USER_QUERY = gql`
	query {
		authenticatedItem {
			... on User {
				id
				email
				name
				# TODO: QUERY the cart once we have it
				cart {
					id
					quantity
					product {
						id
						name
						description
						price
						photo {
							image {
								publicUrlTransformed
							}
						}
					}
				}
			}
		}
	}
`;

export function useUser() {
	const { data } = useQuery(CURRENT_USER_QUERY);
	return data?.authenticatedItem;
}
