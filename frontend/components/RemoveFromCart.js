import { useMutation } from "@apollo/client";
import styled from "styled-components";
import gql from "graphql-tag";

const BigButton = styled.button`
	font-size: 3rem;
	background: none;
	border: 0;
	&:hover {
		cursor: pointer;
	}
`;

const REMOVE_ITEM_FROM_CART_MUTATION = gql`
	mutation REMOVE_ITEM_FROM_CART_MUTATION($id: ID!) {
		deleteCartItem(id: $id) {
			id
		}
	}
`;

// Evicting deleted item from cache
const update = (cache, payload) => {
	cache.evict(cache.identify(payload.data.deleteCartItem));
};

export default function RemoveFromCart({ id }) {
	const [removeItem, { loading }] = useMutation(REMOVE_ITEM_FROM_CART_MUTATION, {
		variables: { id },
		update,
	});
	return (
		<BigButton
			disabled={loading}
			onClick={removeItem}
			title="Remove this Item from Cart"
			type="button"
		>
			&times;
		</BigButton>
	);
}
