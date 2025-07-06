import { useState, useEffect, useCallback } from 'react';

export default function usePagination<T>(items: T[], itemsPerPage = 20) {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  }, [totalPages]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  return {
    currentItems,
    currentPage,
    totalPages,
    goToPage,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1
  };
}