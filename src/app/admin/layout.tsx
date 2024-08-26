import { Nav, NavLink } from '@/components/Nav'
import { ReactNode } from 'react'

type AdminLayoutProps = {
  children: ReactNode
}

const adminLayout = ({ children }: Readonly<AdminLayoutProps>) => {
  return (
    <>
      <Nav>
        <NavLink href='/admin'>Dashboard</NavLink>
        <NavLink href='/admin/products'>Products</NavLink>
        <NavLink href='/admin/users'>Customers</NavLink>
        <NavLink href='/admin/orders'>Sales</NavLink>
      </Nav>
      <div>{children}</div>
    </>
  )
}
export default adminLayout;
