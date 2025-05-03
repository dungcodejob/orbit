import Masonry from 'react-masonry-css';

import { productsData } from './data';
import { ProductCard } from './product-card';
import { useProducts } from '../hooks/use-products';
import { PaginationResult } from '@/types/pagination';
import { Product } from '../types/product';
import { useMemo } from 'react';
import { useFilters } from '@/hooks/use-filters';
import { Route } from '../pages/product-page';

const breakpointColumnsObj = {
    default: 4,
    1360: 3,
    764: 2,
    500: 1,
};

export function ProductsList() {
    const { data } = useProducts();

    const items = useMemo(() => (data as PaginationResult<Product>)?.items || [], [data]);
    return (
        <>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className='-ml-6 flex'
                columnClassName='pl-6 bg-clip-padding flex flex-col gap-6 justify-start'
            >
                {items.map((p, i) => (
                    <ProductCard key={i} {...p} />
                ))}
            </Masonry>
        </>
    );
}
