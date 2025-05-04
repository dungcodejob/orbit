import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_(authenticated)/product/$productId')({
  component: UpdateProductPage,
});

export default function UpdateProductPage() {
  return <></>;
}
