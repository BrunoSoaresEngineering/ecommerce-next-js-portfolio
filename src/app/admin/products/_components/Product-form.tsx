'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import Image from 'next/image';
import { Product } from '@prisma/client';
import { formatCurrency } from '@/lib/formatters';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { addProduct, updateProduct } from '../../_actions/products';
import SubmitButton from './Submit-button';

type Props = {
  product?: Product | null
}

function ProductForm({ product = null }: Props) {
  const [errors, formAction] = useFormState(
    product ? updateProduct.bind(null, product.id) : addProduct,
    { },
  );
  const [priceInCents, setPriceInCents] = useState(product?.priceInCents);

  return (
    <form action={formAction} className="space-y-8">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          defaultValue={product?.name || ''}
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
          {formatCurrency(((priceInCents || 0) / 100))}
        </div>
        {errors?.priceInCents && <div className="text-destructive">{errors.priceInCents}</div>}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={product?.description || ''}
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
          required={product == null}
        />
        {product && <div className="text-muted-foreground">{product.filePath}</div>}
        {errors?.file && <div className="text-destructive">{errors.file}</div>}
      </div>

      <div>
        <Label htmlFor="image">Image</Label>
        <Input
          type="file"
          id="image"
          name="image"
          required={product == null}
        />
        {product && (
          <Image
            src={product.imagePath}
            height="400"
            width="400"
            alt="Product Image"
          />
        )}
        {errors?.image && <div className="text-destructive">{errors.image}</div>}
      </div>

      <SubmitButton />
    </form>
  );
}

export default ProductForm;
