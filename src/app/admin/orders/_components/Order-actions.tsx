'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { deleteOrder } from '../../_actions/orders';

type OrderActionsProps = {
  id: string
};

function DeleteDropdownItem({ id }: OrderActionsProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <DropdownMenuItem
      className="text-destructive"
      disabled={isPending}
      onClick={() => startTransition(async () => {
        await deleteOrder(id);
        router.refresh();
      })}
    >
      Delete
    </DropdownMenuItem>
  );
}
export {
  DeleteDropdownItem,
};
