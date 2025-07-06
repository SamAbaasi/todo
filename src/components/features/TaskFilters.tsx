import React from 'react';
import { Search } from 'lucide-react';
import Select from '../ui/Select';
import type { User } from '../../types/types';
import type { UserOption } from '../../types/types';

interface TaskFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedUserId: number;
  setSelectedUserId: (id: number) => void;
  showCompleted: boolean;
  setShowCompleted: (value: boolean) => void;
  users: User[];
}

export default function TaskFilters({ 
  searchTerm, 
  setSearchTerm, 
  selectedUserId, 
  setSelectedUserId, 
  showCompleted, 
  setShowCompleted, 
  users 
}: TaskFiltersProps) {
  const userOptions: UserOption[] = [
    { value: 0, label: 'All Users' },
    ...users.map(user => ({ value: user.id, label: user.name }))
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <Select
          options={userOptions}
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(Number(e.target.value))}
          className="lg:w-48"
        />
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="showCompleted"
            checked={showCompleted}
            onChange={(e) => setShowCompleted(e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <label htmlFor="showCompleted" className="text-sm text-gray-700 whitespace-nowrap">
            Show completed
          </label>
        </div>
      </div>
    </div>
  );
}