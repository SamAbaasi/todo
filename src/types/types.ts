export interface Todo {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
  }
  
  export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    website: string;
    company: {
      name: string;
    };
  }
  
  export interface TaskFormData {
    title: string;
    userId: number;
    completed: boolean;
  }
  
  export type UserOption = {
    value: number;
    label: string;
  };