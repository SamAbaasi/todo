import { useState, useMemo } from 'react';
import type { Todo } from '../types/types';

export default function useTaskFilters(todos: Todo[]) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [showCompleted, setShowCompleted] = useState(true);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesUser = selectedUserId === 0 || todo.userId === selectedUserId;
      const matchesCompleted = showCompleted || !todo.completed;
      return matchesSearch && matchesUser && matchesCompleted;
    });
  }, [todos, searchTerm, selectedUserId, showCompleted]);

  return {
    searchTerm,
    setSearchTerm,
    selectedUserId,
    setSelectedUserId,
    showCompleted,
    setShowCompleted,
    filteredTodos
  };
}