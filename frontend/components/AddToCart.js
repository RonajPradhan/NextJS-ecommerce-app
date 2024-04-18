import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { CURRENT_USER_QUERY } from "../lib/useUser";

const ADD_TO_CART = gql`
	mutation ADD_TO_CART_MUTATION($id: ID!) {
		addToCart(productId: $id) {
			id
		}
	}
`;

export default function AddToCart({ id }) {
	const [cartMutation, { loading }] = useMutation(ADD_TO_CART, {
		variables: { id },
		refetchQueries: [{ query: CURRENT_USER_QUERY }],
	});
	return (
		<button disabled={loading} onClick={cartMutation} type="button">
			Add {loading && "ing"} To Cart
		</button>
	);
}
