



import { createFileRoute } from '@tanstack/react-router';
import { ProductsList } from '../components/product-list';
import { ProductListFilters } from '../components/product-filter';
import { ProductQueryParams } from '../types';

export const Route = createFileRoute('/_(authenticated)/product')({
  component: ProductPage,
  validateSearch: () => ({}) as Partial<ProductQueryParams>,
});

export default function ProductPage() {
  const { filters, setFilters } = useFilters(Route.id);
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
