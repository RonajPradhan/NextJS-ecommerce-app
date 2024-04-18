import { useUser } from "../lib/useUser";
import CartStyles from "./styles/CartStyles";
import Supreme from "./styles/Supreme";
import formatMoney from "../lib/formatMoney";
import { calcTotalPrice } from "../lib/calcTotalPrice";
import styled from "styled-components";
import { useCart } from "../lib/cartState";
import CloseButton from "./styles/CloseButton";
import RemoveFromCart from "./RemoveFromCart";

const CartItemStyles = styled.li`
	padding: 1rem 0;
	border-bottom: 1px solid chartreuse(--lightGrey);
	display: grid;
	grid-template-columns: auto 1fr auto;
	img {
		margin-right: 1rem;
	}
	h3,
	p {
		margin: 0;
	}
`;

function CartItem({ cartItem }) {
	const { product } = cartItem;
	if (!product) return null;
	return (
		<CartItemStyles>
			<img
				width="100"
				src={product?.photo?.image?.publicUrlTransformed}
				alt={product?.name}
			/>
			<div>
				<h3>{product.name}</h3>
				<p>
					{formatMoney(product?.price * cartItem?.quantity)}-
					<em>
						{cartItem?.quantity} &times;{" "}
						{formatMoney(product?.price)} each
					</em>
				</p>
			</div>
			<RemoveFromCart id={cartItem?.id}/>
		</CartItemStyles>
	);
}

export default function Cart() {
	const user = useUser();
	if (!user) return null;

	const { cartOpen, closeCart } = useCart();
	return (
		<CartStyles open={cartOpen}>
			<header>
				<Supreme>{user.name}'s Cart</Supreme>
				<CloseButton onClick={closeCart}>&times;</CloseButton>
			</header>

			<ul>
				{user?.cart.map((item) => (
					<CartItem key={item.id} cartItem={item} />
				))}
			</ul>
			<footer>
				<p>{formatMoney(calcTotalPrice(user?.cart))}</p>
			</footer>
		</CartStyles>
	);
}
