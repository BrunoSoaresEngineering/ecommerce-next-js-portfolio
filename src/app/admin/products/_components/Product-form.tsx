'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import { formatCurrency } from '@/lib/formatters';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { addProduct } from '../../_actions/products';
import SubmitButton from './Submit-button';

type Props = {}

function ProductForm({ props }: Props) {
  const [errors, formAction] = useFormState(addProduct, { name: '' });
  const [priceInCents, setPriceInCents] = useState(0);

  return (
    <form action={formAction} className="space-y-8">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
        />
        {errors?.name && <div className="text-destructive">{errors.name}</div>}
      </div>

      <div>
        <Label htmlFor="priceInCents">Price In Cents</Label>
        <Input
          type="number"
          id="priceInCents"
          name="priceInCents"
          required
          value={priceInCents}
          onChange={(ev) => setPriceInCents(Number(ev.target.value))}
        />
        <div className="text-muted-foreground">
          {formatCurrency((priceInCents / 100))}
        </div>
        {errors?.priceInCents && <div className="text-destructive">{errors.priceInCents}</div>}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          required
        />
        {errors?.description && <div className="text-destructive">{errors.description}</div>}
      </div>

      <div>
        <Label htmlFor="file">File</Label>
        <Input
          type="file"
          id="file"
          name="file"
          required
        />
        {errors?.file && <div className="text-destructive">{errors.file}</div>}
      </div>

      <div>
        <Label htmlFor="image">Image</Label>
        <Input
          type="file"
          id="image"
          name="image"
          required
        />
        {errors?.image && <div className="text-destructive">{errors.image}</div>}
      </div>

      <SubmitButton />
    </form>
  );
}

export default ProductForm;
