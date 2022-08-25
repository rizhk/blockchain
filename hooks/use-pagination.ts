import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';

export const useClientPagination = <T, F>(data: T[], shouldRefresh = true, initialFilters?: F) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [filters, setFilters] = useState<F | undefined>(initialFilters || undefined);
  const [currentData, setCurrentData] = useState<T[]>([]);
  const count = data?.length;
  const applyFilters = (data: T[], filters?: F): T[] => {
    if (!filters) return data;
    return data.filter((item) => {
      return item;
    });
  };

  const applyPagination = (data: T[], page: number, rowsPerPage: number): T[] =>
    data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const getCurrentData = () => {
    const filtered = applyFilters(data, filters);
    const paginated = applyPagination(filtered, page, rowsPerPage);
    return paginated;
  };

  const onPageChange = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const onRowsPerPageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    setCurrentData(getCurrentData());
  }, [page, JSON.stringify(filters), JSON.stringify(data)]);

  useEffect(() => {
    if (shouldRefresh) setPage(0);
  }, [JSON.stringify(data)]);

  return {
    currentData,
    count,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
  };
};
