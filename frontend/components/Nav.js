import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import { useUser } from "../lib/useUser";
import SignOut from "./SignOut";
import { useCart } from "../lib/cartState";
import CartCount from "./CartCount";
import { cartTotalCount } from "../lib/calcTotalPrice";

export default function Nav() {
	const user = useUser();
	const { openCart } = useCart();
	console.log(cartTotalCount(user?.cart));
	return (
		<NavStyles>
			<Link href="/product">Products</Link>
			{user && (
				<>
					<Link href="/orders">Orders</Link>
					<Link href="/sell">Sell</Link>
					<Link href="/account">Account</Link>
					<SignOut />
					<button type="button" onClick={openCart}>
						My Cart
						<CartCount count={cartTotalCount(user?.cart)} />
					</button>
				</>
			)}
			{!user && (
				<>
					<Link href="/signin">Sign in</Link>
				</>
			)}
		</NavStyles>
	);
}
