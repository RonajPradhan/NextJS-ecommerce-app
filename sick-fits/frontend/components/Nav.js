import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import { GetUser } from './User';

export default function Nav() {
  const user = GetUser();
  console.log(user);
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
        </>
      )}
      {!user && <Link href="/signIn">SignIn</Link>}
    </NavStyles>
  );
}
