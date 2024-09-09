import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatCurrency } from '@/lib/formatters';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';

type Props = {
  id: string,
  name: string,
  priceInCents: number,
  description: string,
  imagePath: string,
}

function ProductCard({
  id, name, priceInCents, description, imagePath,
}: Props) {
  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="relative w-full h-auto aspect-video">
        <Image src={imagePath} alt={name} fill />
      </div>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{formatCurrency(priceInCents / 100)}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="line-clamp-4">{description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild size="lg" className="w-full">
          <Link href={`/products/${id}/purchase`}>Purchase</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

function ProductCardSkeleton() {
  return (
    <Card className="flex flex-col overflow-hidden animate-pulse">
      <div className="relative w-full aspect-video bg-gray-300" />
      <CardHeader>
        <CardTitle>
          <div className="w-3/4 h-6 rounded-full bg-gray-300" />
        </CardTitle>
        <CardDescription>
          <div className="w-1/2 h-4 rounded-full bg-gray-300" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-3/4 h-4 rounded-full bg-gray-300" />
      </CardContent>
      <CardFooter>
        <Button size="lg" className="w-full" />
      </CardFooter>
    </Card>
  );
}

export {
  ProductCard,
  ProductCardSkeleton,
};
