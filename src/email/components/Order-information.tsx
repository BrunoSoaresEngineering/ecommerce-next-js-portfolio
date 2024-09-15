import { URL } from 'node:url';
import { formatCurrency, formatDateMedium } from '@/lib/formatters';
import {
  Button,
  Column,
  Img,
  Row,
  Section,
  Text,
} from '@react-email/components';

type Props = {
  product: {
    name: string,
    imagePath: string,
    description: string,
  },
  order: {
    id: string,
    createdAt: Date,
    pricePaidInCents: number,
  },
  serverUrl: string,
  downloadVerificationId: string,
}

function OrderInformation({
  product,
  order,
  serverUrl,
  downloadVerificationId,
}: Props) {
  const downloadUrl = new URL(downloadVerificationId, new URL('products/download', serverUrl));
  return (
    <>
      <Section>
        <Row>
          <Column>
            <Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4">
              Order ID
            </Text>
            <Text className="mt-0 mr-4">{order.id}</Text>
          </Column>
          <Column>
            <Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4">
              Purchased On
            </Text>
            <Text className="mt-0 mr-4">{formatDateMedium(order.createdAt)}</Text>
          </Column>
          <Column>
            <Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4">
              Price Paid
            </Text>
            <Text className="mt-0 mr-4">{formatCurrency(order.pricePaidInCents / 100)}</Text>
          </Column>
        </Row>
      </Section>
      <Section className="border border-solid border-gray-500 rounded-lg p-4 md:p-6 my-4">
        <Img
          alt={product.name}
          src={(new URL(product.imagePath, serverUrl)).toString()}
          width="100%"
        />
        <Row className="mt-8">
          <Column className="align-bottom">
            <Text className="text-lg font-bold m-0 mr-4">{product.name}</Text>
          </Column>
          <Column align="right">
            <Button
              href={downloadUrl.toString()}
              className="bg-black text-white px-6 py-4 rounded text-lg"
            >
              Download
            </Button>
          </Column>
        </Row>
        <Row>
          <Column>
            <Text className="text-gray-500 mb-0">{product.description}</Text>
          </Column>
        </Row>
      </Section>
    </>
  );
}
export default OrderInformation;
