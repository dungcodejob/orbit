import { useDateFormatter, useDebounceCallback, useFilters } from '@/hooks';
import {
  Pagination,
  PaginationResult,
  Sort,
  TanstackPagination,
  TanstackSort,
} from '@/types';
import { useMemo } from 'react';
import { Route } from '../pages/product-page';
import { ColumnDef, OnChangeFn } from '@tanstack/react-table';
import { DataTable, DataTableFilter } from '@/components/data-table';
import { useTranslation } from 'react-i18next';
import { Product } from '../types';
import { useProducts } from '../hooks/use-products';
import { TableActionsDropdown } from '@/components/table-actions-dropdown';
import { Link } from '@tanstack/react-router';
import { RiFileCopyLine, RiPencilLine } from '@remixicon/react';
import { RowActionDelete } from '@/components/row-action-delete';
import { useDeleteProduct } from '../hooks';

export function ProductTable() {
  const { filters, setFilters } = useFilters(Route.id);
  const { formatDateTime } = useDateFormatter();
  const { t } = useTranslation();

  const { data, isLoading, isPlaceholderData } = useProducts();
  const { mutateAsync: deleteProduct } = useDeleteProduct();
  const pagination = useMemo<TanstackPagination>(
    () => Pagination.toTablePagination(filters),
    [filters],
  );
  const setPagination: OnChangeFn<TanstackPagination> = (updateOrValue) => {
    const newPagination =
      typeof updateOrValue === 'function'
        ? updateOrValue(pagination)
        : updateOrValue;

    setFilters({
      ...filters,
      ...Pagination.toBackendPagination(newPagination),
    });
  };

  const sorting = useMemo<TanstackSort>(
    () => Sort.toTableSort(filters),
    [filters],
  );

  const setSorting: OnChangeFn<TanstackSort> = (updateOrValue) => {
    const newSorting =
      typeof updateOrValue === 'function'
        ? updateOrValue(sorting)
        : updateOrValue;

    setFilters({
      ...filters,
      ...Sort.toBackendSort(newSorting),
    });
  };

  const onSearchChange = useDebounceCallback((value) =>
    setFilters({
      ...filters,
      keyword: value,
    }),
  );

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: 'name',
      header: t('product.product_name'),
    },
    {
      accessorKey: 'createdAt',
      header: t('product.created_at'),
      cell: ({ row }) => formatDateTime(row.getValue('createdAt')),
    },
    {
      accessorKey: 'updatedAt',
      header: t('product.updated_at'),
      cell: ({ row }) => formatDateTime(row.getValue('updatedAt')),
    },
  ];

  const items = useMemo(
    () => (data as PaginationResult<Product>)?.items || [],
    [data],
  );
  const totalItems = useMemo(
    () => (data as PaginationResult<Product>)?.total || 0,
    [data],
  );
  return (
    <div className="flex flex-col items-center justify-center mt-6 md:mt-10">
      <DataTable
        columns={columns}
        data={items}
        totalItems={totalItems}
        getRowId={(row) => row.id.toString()}
        manualPagination={true}
        onPaginationChange={setPagination}
        defaultPagination={pagination}
        manualSorting={true}
        defaultSorting={sorting}
        onSortingChange={setSorting}
        isLoading={isLoading}
        isPlaceholderData={isPlaceholderData}
        enableRowNumbers
        enableRowActions
        renderRowActions={(row) => (
          <TableActionsDropdown
            actions={[
              {
                id: 'update',
                component: (
                  <Link
                    to={'/products/$productId'}
                    params={{ productId: row.original.id.toString() }}
                  >
                    <RiPencilLine />
                    {t('product.update')}
                  </Link>
                ),
              },
              {
                id: 'clone',
                component: (
                  <Link
                    to={'/products/$productId'}
                    params={{ productId: row.original.id.toString() }}
                  >
                    <RiFileCopyLine />
                    {t('product.clone')}
                  </Link>
                ),
              },
              {
                id: 'delete',
                component: (
                  <RowActionDelete
                    onConfirm={() => {
                      deleteProduct(row.original.id);
                    }}
                  />
                ),
              },
            ]}
          />
        )}
      >
        <DataTableFilter
          keyword={filters.keyword}
          placeholder={t('product.input_name_to_search')}
          onKeywordChange={onSearchChange}
        ></DataTableFilter>
      </DataTable>
    </div>
  );
}
