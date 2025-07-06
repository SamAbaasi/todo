import React, { useState } from 'react';
import { Edit2, User } from 'lucide-react';
import Select from '../ui/Select';
import type { Todo, User as UserType } from '../../types/types';
import type { UserOption } from '../../types/types';

interface TaskItemProps {
  task: Todo;
  user?: UserType;
  users: UserType[];
  onToggleComplete: (id: number) => void;
  onEdit: (task: Todo) => void;
  onUserAssign: (taskId: number, userId: number) => void;
  onUserClick: (user: UserType) => void;
}

export default function TaskItem({ 
  task, 
  user, 
  users, 
  onToggleComplete, 
  onEdit, 
  onUserAssign, 
  onUserClick 
}: TaskItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggleComplete = async () => {
    setIsUpdating(true);
    await new Promise(resolve => setTimeout(resolve, 200));
    onToggleComplete(task.id);
    setIsUpdating(false);
  };

  const userOptions: UserOption[] = [
    { value: 0, label: 'Unassigned' },
    ...users.map(u => ({ value: u.id, label: u.name }))
  ];

  return (
    <div className={`bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-all duration-300 fade-in ${
      task.completed ? 'opacity-75 task-completed' : ''
    }`}>
      <div className="flex items-start gap-3">
        <div className="flex items-center">
          {isUpdating ? (
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleToggleComplete}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
            />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className={`font-medium break-words ${
            task.completed ? 'line-through text-gray-500' : 'text-gray-900'
          }`}>
            {task.title}
          </h3>
          
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <Select
              options={userOptions}
              value={task.userId}
              onChange={(e) => onUserAssign(task.id, Number(e.target.value))}
              className="text-sm min-w-0 flex-shrink-0"
            />
            
            {user && (
              <button
                onClick={() => onUserClick(user)}
                className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
              >
                <User size={14} />
                <span className="truncate">{user.name}</span>
              </button>
            )}
          </div>
        </div>
        
        <button
          onClick={() => onEdit(task)}
          className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded transition-colors"
          title="Edit task"
        >
          <Edit2 size={16} />
        </button>
      </div>
    </div>
  );
}