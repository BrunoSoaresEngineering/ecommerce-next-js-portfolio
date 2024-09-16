import React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Tailwind,
} from '@react-email/components';
import OrderInformation from './components/Order-information';

type OrderHistoryEmailProps = {
  orders: {
    id: string,
    createdAt: Date,
    pricePaidInCents: number,
    downloadVerificationId: string,
    product: {
      name: string,
      imagePath: string,
      description: string,
    }
  }[],
  serverUrl: string,
}

function OrderHistoryEmail({ orders, serverUrl }: OrderHistoryEmailProps) {
  return (
    <Html>
      <Preview>Order History and Downloads</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Heading>Order History</Heading>
            {orders.map((order, index) => (
              <React.Fragment key={order.id}>
                <OrderInformation
                  order={order}
                  product={order.product}
                  serverUrl={serverUrl}
                  downloadVerificationId={order.downloadVerificationId}
                />
                {index < orders.length - 1 && <Hr />}
              </React.Fragment>
            ))}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

OrderHistoryEmail.PreviewProps = {
  orders: [
    {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      pricePaidInCents: 12300,
      product: {
        name: 'Product Name',
        imagePath: '/products/d24e2e25-8eaa-4eaf-a078-69a8c22f90a0-banner-presidencial.jpg',
        description: 'Product Description',
      },
      downloadVerificationId: crypto.randomUUID(),
    },
    {
      id: crypto.randomUUID(),
      createdAt: new Date(300000000500),
      pricePaidInCents: 2000,
      product: {
        name: 'Product Name',
        imagePath: '/products/db5a2283-3c9c-449c-a4ac-943c652c9124-Screenshot from 2024-08-15 14-38-46.png',
        description: 'Product Description',
      },
      downloadVerificationId: crypto.randomUUID(),
    },
  ],
  serverUrl: 'http://localhost:3000',
} satisfies OrderHistoryEmailProps;

export default OrderHistoryEmail;
