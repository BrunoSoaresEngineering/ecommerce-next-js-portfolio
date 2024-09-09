'use client';

import { ComponentProps, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

type NavProps = {
  children: ReactNode
};

function Nav({ children }: NavProps) {
  return (
    <nav className="bg-primary text-primary-foreground flex justify-center px-4">
      {children}
    </nav>
  );
}

function NavLink(props: Omit<ComponentProps<typeof Link>, 'className'>) {
  const pathname = usePathname();

  const { href } = props;

  return (
    <Link
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      className={cn(
        'p-4 hover:bg-secondary hover:text-secondary-foreground',
        'focus-visible:bg-secondary focus-visible:text-secondary-foreground',
        pathname === href && 'bg-background text-foreground',
      )}
    />
  );
}

export {
  Nav,
  NavLink,
};
