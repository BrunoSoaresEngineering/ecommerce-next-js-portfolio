import { Nav, NavLink } from '@/components/Nav';
import { ReactNode } from 'react';

export const dynamic = 'force-dynamic';

type AdminLayoutProps = {
  children: ReactNode
}

function adminLayout({ children }: Readonly<AdminLayoutProps>) {
  return (
    <>
      <Nav>
        <NavLink href="/admin">Dashboard</NavLink>
        <NavLink href="/admin/products">Products</NavLink>
        <NavLink href="/admin/users">Customers</NavLink>
        <NavLink href="/admin/orders">Sales</NavLink>
      </Nav>
      <div className="container my-6">{children}</div>
    </>
  );
}

export default adminLayout;
