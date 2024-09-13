import { Button } from '@/components/ui/button';
import Link from 'next/link';

function ExpiredPage() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-4">Download Link Expired</h1>
      <Button asChild size="lg">
        <Link href="/orders">Get New Link</Link>
      </Button>
    </>
  );
}
export default ExpiredPage;
