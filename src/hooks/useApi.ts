import { useState, useEffect } from 'react';
import ApiService from '../services/ApiService';
import type { Todo, User } from '../types/types';

export default function useApi() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [todosData, usersData] = await Promise.all([
          ApiService.fetchTodos(),
          ApiService.fetchUsers(),
        ]);
        setTodos(todosData);
        setUsers(usersData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { todos, users, loading, error, setTodos };
}