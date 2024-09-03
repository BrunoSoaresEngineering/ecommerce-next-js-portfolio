import { ReactNode } from 'react';

type PageHeaderProps = {
  children: ReactNode
};

function PageHeader({ children }: PageHeaderProps) {
  return (
    <h1 className="text-4xl mb-4">{children}</h1>
  );
}

export default PageHeader;
