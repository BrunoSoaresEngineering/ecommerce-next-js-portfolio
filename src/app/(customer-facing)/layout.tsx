import { Nav, NavLink } from '@/components/Nav';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode
};

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Nav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/products">Products</NavLink>
        <NavLink href="/orders">My Orders</NavLink>
      </Nav>
      <div className="container my-6">
        {children}
      </div>
    </>
  );
}
export default Layout;
