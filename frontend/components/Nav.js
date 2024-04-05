import Link from "next/link";
import NavStyles from "./styles/NavStyles";

export default function Nav() {
	return (
		<NavStyles>
			<Link href="/product">Products</Link>
			<Link href="/orders">Orders</Link>
			<Link href="/sell">Sell</Link>
			<Link href="/account">Account</Link>
		</NavStyles>
	);
}
