import type { Todo, User } from "../types/types";

export default class ApiService {
    static baseUrl = 'https://jsonplaceholder.typicode.com';
  
    static async fetchTodos(): Promise<Todo[]> {
      const response = await fetch(`${this.baseUrl}/todos`);
      if (!response.ok) throw new Error('Failed to fetch todos');
      return response.json();
    }
  
    static async fetchUsers(): Promise<User[]> {
      const response = await fetch(`${this.baseUrl}/users`);
      if (!response.ok) throw new Error('Failed to fetch users');
      return response.json();
    }
  }