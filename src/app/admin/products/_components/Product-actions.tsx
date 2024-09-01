'use client';

import { useRouter } from 'next/navigation';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useTransition } from 'react';
import { deleteProduct, toggleProductAvailability } from '../../_actions/products';

type ToggleActiveProductProps = {
  id: string,
  isAvailableForPurchase: boolean
}
function ToggleActiveDropdownItem({ id, isAvailableForPurchase }: ToggleActiveProductProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          toggleProductAvailability(id, !isAvailableForPurchase);
          router.refresh();
        });
      }}
    >
      {isAvailableForPurchase ? 'Deactivate' : 'Activate'}
    </DropdownMenuItem>
  );
}

type DeleteDropdownItemProps = {
  id: string,
  disabled: boolean
};
function DeleteDropdownItem({ id, disabled }: DeleteDropdownItemProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <DropdownMenuItem
      className="text-destructive"
      disabled={disabled || isPending}
      onClick={() => startTransition(async () => {
        await deleteProduct(id);
        router.refresh();
      })}
    >
      Delete
    </DropdownMenuItem>
  );
}

export {
  ToggleActiveDropdownItem,
  DeleteDropdownItem,
};
