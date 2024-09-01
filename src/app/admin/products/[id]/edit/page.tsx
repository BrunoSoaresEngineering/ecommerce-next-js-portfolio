import db from '@/db/db';
import PageHeader from '@/app/admin/_components/PageHeader';
import ProductForm from '../../_components/Product-form';

type EditProductProps = {
  params: {
    id: string
  }
};

async function EditProduct({ params: { id } }: EditProductProps) {
  const product = await db.product.findUnique({ where: { id } });

  return (
    <>
      <PageHeader>Edit Product</PageHeader>
      <ProductForm product={product} />
    </>
  );
}
export default EditProduct;
