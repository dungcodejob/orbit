



import { createFileRoute } from '@tanstack/react-router';
import { ProductsList } from '../components/product-list';
import { ProductListFilters } from '../components/product-filter';

export const Route = createFileRoute('/_(authenticated)/product')({
  component: ProductPage,
});

export default function ProductPage() {
  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-10">
      <div className='px-4 pb-6 lg:px-8'>
        {/* <DashedDivider />
        <ProductsSummary />
        <DashedDivider /> */}

        <ProductListFilters />
        <ProductsList />
        {/* <EditProductDrawer /> */}
      </div>
    </div>
  );
}
