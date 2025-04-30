



import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_(authenticated)/product')({
  component: ProductPage,
});

export default function ProductPage() {
  return (
    <div className="flex flex-col items-center justify-center bg-muted p-6 md:p-10">
      Product Page
    </div>
  );
}
