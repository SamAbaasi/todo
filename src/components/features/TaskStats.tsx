import React, { useMemo } from 'react';
import type { Todo } from '../../types/types';

interface TaskStatsProps {
  todos: Todo[];
}

export default function TaskStats({ todos }: TaskStatsProps) {
  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const pending = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { total, completed, pending, completionRate };
  }, [todos]);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
        <div className="text-sm text-gray-600">Total Tasks</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
        <div className="text-sm text-gray-600">Completed</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
        <div className="text-sm text-gray-600">Pending</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="text-2xl font-bold text-purple-600">{stats.completionRate}%</div>
        <div className="text-sm text-gray-600">Completion Rate</div>
      </div>
    </div>
  );
}