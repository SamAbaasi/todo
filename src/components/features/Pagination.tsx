import React from 'react';
import Button from '../ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNext: boolean;
  hasPrev: boolean;
  totalItems: number;
  currentItems: number;
}

export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  hasNext, 
  hasPrev,
  totalItems,
  currentItems 
}: PaginationProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
      <div className="text-sm text-gray-700">
        Showing {currentItems} of {totalItems} tasks
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrev}
        >
          <ChevronLeft size={16} />
        </Button>
        
        <span className="px-3 py-1 text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNext}
        >
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
}