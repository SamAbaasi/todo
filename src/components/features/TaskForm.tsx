import React, { useState } from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import type { User } from '../../types/types';
import type { UserOption } from '../../types/types';
import type { TaskFormData } from '../../types/types';

interface TaskFormProps {
  task?: TaskFormData & { id?: number };
  users: User[];
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
}

export default function TaskForm({ task, users, onSubmit, onCancel }: TaskFormProps) {
  const [formData, setFormData] = useState<TaskFormData>({
    title: task?.title || '',
    userId: task?.userId || 0,
    completed: task?.completed || false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (formData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    }
  };

  const userOptions: UserOption[] = [
    { value: 0, label: 'Unassigned' },
    ...users.map(user => ({ value: user.id, label: user.name }))
  ];

  return (
    <div className="space-y-4">
      <Input
        label="Title"
        required
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        onKeyPress={handleKeyPress}
        error={errors.title}
        placeholder="Enter task title..."
      />
      
      <Select
        label="Assigned User"
        options={userOptions}
        value={formData.userId}
        onChange={(e) => setFormData({ ...formData, userId: Number(e.target.value) })}
      />

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="completed"
          checked={formData.completed}
          onChange={(e) => setFormData({ ...formData, completed: e.target.checked })}
          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
        />
        <label htmlFor="completed" className="text-sm text-gray-700">
          Mark as completed
        </label>
      </div>

      <div className="flex gap-2 pt-4">
        <Button onClick={handleSubmit} className="flex-1">
          {task ? 'Update Task' : 'Add Task'}
        </Button>
        <Button variant="secondary" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
      </div>
      
      <p className="text-xs text-gray-500 text-center">
        Press Ctrl+Enter to save quickly
      </p>
    </div>
  );
}