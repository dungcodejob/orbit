

import { PaginationItem, PaginationPrevious } from '@/components/ui/pagination';

import { CURRENT_PAGE_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS } from '@/constants/default-values';
import { cn } from '@/utils/cn';
// import { getPageNumbers } from '@/utils/helpers';
import {
  RiArrowLeftDoubleLine,
  RiArrowLeftSLine,
  RiArrowRightDoubleLine,
  RiArrowRightSLine,
} from '@remixicon/react';
import { type FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react';
import { Button } from './ui/button';

export type PaginationProps = {
  pageIndex: number;
  pageSize: number;
  totalItems: number;
  onCurrentPageChange: (page: number) => void;
  onPageSizeChange: (itemsPerPage: number) => void;
  pageSizeOptions?: number[];
  className?: string;
  isPlaceholderData?: boolean;
  
} & React.HTMLAttributes<HTMLDivElement>

const PaginationControls: FC<PaginationProps> = ({
  pageIndex = CURRENT_PAGE_DEFAULT - 1,
  pageSize = PAGE_SIZE_DEFAULT,
  totalItems,
  onCurrentPageChange: onPageChange,
  onPageSizeChange,
  pageSizeOptions = PAGE_SIZE_OPTIONS,
  isPlaceholderData = false,
  className,
  ...rest
}: PaginationProps) => {
  const { t } = useTranslation();

  const totalPages = useMemo(
    () => Math.ceil(totalItems / (pageSize || 0)),
    [totalItems, pageSize],
  );
  const goToFirstPage = () => onPageChange(0);
  const goToPreviousPage = () => onPageChange(Math.max(0, pageIndex - 1));
  const goToNextPage = () =>
    onPageChange(Math.min(totalPages - 1, pageIndex + 1));
  const goToLastPage = () => onPageChange(totalPages - 1);

  // const pageNumbers = useMemo(
  //   () => getPageNumbers(totalPages, currentPage),
  //   [totalPages, currentPage],
  // );

  const start = pageIndex * pageSize + 1;
  const end = Math.min(start + pageSize - 1, totalItems);

  const handleClickPageNumber: (page: number | string) => void = (page) => {
    if (typeof page === 'number') {
      onPageChange(page - 1);
    }
  };

  return <div className="flex items-center justify-between px-4 w-full">
    <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
      {/* {table.getFilteredSelectedRowModel().rows.length} of{" "}
      {table.getFilteredRowModel().rows.length} row(s) selected. */}
    </div>
    <div className="flex  items-center gap-8">
      <div className="hidden items-center gap-2 lg:flex">
        <Label htmlFor="rows-per-page" className="text-sm font-medium">
          Rows per page
        </Label>
        <Select
          value={`${pageSize}`}
          onValueChange={(value) => onPageSizeChange(Number(value))}
        >
          <SelectTrigger className="w-20" id="rows-per-page">
            <SelectValue
              placeholder={pageSize}
            />
          </SelectTrigger>
          <SelectContent side="top">
            {pageSizeOptions.map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-fit items-center justify-center text-sm font-medium">
        Page {pageIndex + 1} of{" "}
        {totalItems/ pageSize}
      </div>
      <div className="ml-auto flex items-center gap-2 lg:ml-0">
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => goToFirstPage()}
          disabled={pageIndex === 0}
        >
          <span className="sr-only">Go to first page</span>
          <ChevronsLeftIcon />
        </Button>
        <Button
          variant="outline"
          className="size-8"
          size="icon"
          onClick={() => goToPreviousPage()}
          disabled={pageIndex === 0}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeftIcon />
        </Button>
        <Button
          variant="outline"
          className="size-8"
          size="icon"
          onClick={() => goToNextPage()}
          disabled={pageIndex === totalPages}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRightIcon />
        </Button>
        <Button
          variant="outline"
          className="hidden size-8 lg:flex"
          size="icon"
          onClick={() => goToLastPage()}
          disabled={pageIndex === totalPages}
        >
          <span className="sr-only">Go to last page</span>
          <ChevronsRightIcon />
        </Button>
      </div>
    </div>
  </div>

  // return (
  //   <div className={cn('mt-auto', className)} {...rest}>
  //     <div className="mt-4 flex items-center justify-between py-4 lg:hidden">
  //       <PaginationItem>
  //         <PaginationPrevious
  //           className="w-28"
  //           onClick={goToPreviousPage}
  //           d
  //           disabled={currentPage === 0}
  //         >
  //           {t('pagination_previous')}
  //         </PaginationPrevious >
  //       </PaginationItem>
  //       <span className="whitespace-nowrap text-center text-paragraph-sm text-text-sub-600">
  //         {t('pagination_page_of', {
  //           currentPage: currentPage + 1,
  //           totalPages,
  //         })}
  //       </span>
  //       <Button.Root
  //         variant="neutral"
  //         mode="stroke"
  //         size="xsmall"
  //         className="w-28"
  //         onClick={goToNextPage}
  //         disabled={currentPage === totalPages}
  //       >
  //         {t('pagination_next')}
  //       </Button.Root>
  //     </div>
  //     <div className="mt-10 hidden items-center gap-3 lg:flex">
  //       <span className="flex-1 whitespace-nowrap text-paragraph-sm text-text-sub-600">
  //         {t('pagination_display_items', { start, end, totalItems })}
  //       </span>

  //       <Pagination.Root>
  //         <Pagination.NavButton
  //           onClick={goToFirstPage}
  //           disabled={currentPage === 0}
  //         >
  //           <Pagination.NavIcon as={RiArrowLeftDoubleLine} />
  //         </Pagination.NavButton>
  //         <Pagination.NavButton
  //           onClick={goToPreviousPage}
  //           disabled={currentPage === 0}
  //         >
  //           <Pagination.NavIcon as={RiArrowLeftSLine} />
  //         </Pagination.NavButton>
  //         {pageNumbers.map((page) =>
  //           typeof page === 'number' ? (
  //             <Pagination.Item
  //               key={`page-${page}`}
  //               current={page === currentPage + 1}
  //               onClick={() => handleClickPageNumber(page)}
  //             >
  //               {page}
  //             </Pagination.Item>
  //           ) : (
  //             <Pagination.Item key={`ellipsis-${page}`}>{page}</Pagination.Item>
  //           ),
  //         )}
  //         <Pagination.NavButton
  //           onClick={goToNextPage}
  //           // Disable the Next Page button until we know a next page is available
  //           disabled={currentPage === totalPages - 1 || isPlaceholderData}
  //         >
  //           <Pagination.NavIcon as={RiArrowRightSLine} />
  //         </Pagination.NavButton>
  //         <Pagination.NavButton
  //           onClick={goToLastPage}
  //           // Disable the Next Page button until we know a next page is available
  //           disabled={currentPage === totalPages - 1 || isPlaceholderData}
  //         >
  //           <Pagination.NavIcon as={RiArrowRightDoubleLine} />
  //         </Pagination.NavButton>
  //       </Pagination.Root>

  //       <div className="flex flex-1 justify-end">
  //         <Select.Root
  //           size="xsmall"
  //           defaultValue={pageSize?.toString()}
  //           onValueChange={(value) => onPageSizeChange(Number(value))}
  //         >
  //           <Select.Trigger className="w-auto">
  //             <Select.Value />
  //           </Select.Trigger>
  //           <Select.Content>
  //             {pageSizeOptions.map((option) => (
  //               <Select.Item key={option} value={String(option)}>
  //                 <span className="lowercase">
  //                   {option} / {t('page')}
  //                 </span>
  //               </Select.Item>
  //             ))}
  //           </Select.Content>
  //         </Select.Root>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default PaginationControls;
