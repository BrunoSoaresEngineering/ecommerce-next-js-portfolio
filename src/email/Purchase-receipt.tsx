import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Tailwind,
} from '@react-email/components';
import OrderInformation from './components/Order-information';

type PurchaseReceiptEmailProps = {
  product: {
    name: string,
    imagePath: string,
    description: string,
  },
  order: {
    id: string,
    createdAt: Date,
    pricePaidInCents: number
  },
  serverUrl: string,
  downloadVerificationId: string,
}

function PurchaseReceiptEmail({
  product,
  order,
  serverUrl,
  downloadVerificationId,
} : PurchaseReceiptEmailProps) {
  return (
    <Html>
      <Preview>
        Download
        {product.name}
        {' '}
        and view receipt
      </Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Heading>Purchase Receipt</Heading>
            <OrderInformation
              product={product}
              order={order}
              serverUrl={serverUrl}
              downloadVerificationId={downloadVerificationId}
            />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

PurchaseReceiptEmail.PreviewProps = {
  product: {
    name: 'Product Name',
    imagePath: '/products/d24e2e25-8eaa-4eaf-a078-69a8c22f90a0-banner-presidencial.jpg',
    description: 'Product Description',
  },
  order: {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    pricePaidInCents: 12300,
  },
  serverUrl: 'http://localhost:3000',
  downloadVerificationId: crypto.randomUUID(),
} satisfies PurchaseReceiptEmailProps;

export default PurchaseReceiptEmail;
