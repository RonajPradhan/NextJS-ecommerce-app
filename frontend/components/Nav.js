import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import { useUser } from "../lib/useUser";
import SignOut from "./SignOut";

export default function Nav() {
	const user = useUser();
	console.log(user);
	return (
		<NavStyles>
			<Link href="/product">Products</Link>
			{user && (
				<>
					<Link href="/orders">Orders</Link>
					<Link href="/sell">Sell</Link>
					<Link href="/account">Account</Link>
					<SignOut />
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
