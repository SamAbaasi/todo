import React from 'react';
import { X } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 fade-in">
      <div className="flex items-center">
        <X className="w-5 h-5 mr-2" />
        {message}
      </div>
    </div>
  );
}