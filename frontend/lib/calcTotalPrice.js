export function calcTotalPrice(cart) {
	return cart.reduce((tally, cartItem) => {
		if (!cartItem?.product) return tally; //products can be deleted but they could still be in your cart
		return tally + cartItem?.quantity * cartItem?.product?.price;
	}, 0);
}

export function cartTotalCount(cart) {
	console.log(cart);
	return cart?.reduce(
		(tally, cartItem) => tally + (cartItem.product ? cartItem.quantity : 0),
		0
	);
}
