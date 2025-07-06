import React, { useCallback } from 'react';
import useApi from '../hooks/useApi';
import useTaskFilters from '../hooks/useTaskFilters';
import usePagination from '../hooks/usePagination';
import TaskStats from '../components/features/TaskStats';
import TaskFilters from '../components/features/TaskFilters';
import Button from '../components/ui/Button';
import TaskItem from '../components/features/TaskItem';
import Pagination from '../components/features/Pagination';
import Modal from '../components/ui/Modal';
import TaskForm from '../components/features/TaskForm';
import UserProfile from '../components/features/UserProfile';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';
import { Plus } from 'lucide-react';
import type { Todo, User, TaskFormData } from '../types/types';

export default function TaskManagementPage() {
  const { todos, users, loading, error, setTodos } = useApi();
  const {
    searchTerm,
    setSearchTerm,
    selectedUserId,
    setSelectedUserId,
    showCompleted,
    setShowCompleted,
    filteredTodos
  } = useTaskFilters(todos);
  
  const pagination = usePagination(filteredTodos);
  const { currentItems, currentPage, totalPages, goToPage, hasNext, hasPrev } = pagination;
  
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [editingTask, setEditingTask] = React.useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  const handleToggleComplete = useCallback((id: number) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, [setTodos]);

  const handleUserAssign = useCallback((taskId: number, userId: number) => {
    setTodos(prev => prev.map(todo => 
      todo.id === taskId ? { ...todo, userId } : todo
    ));
  }, [setTodos]);

  const handleAddTask = useCallback((data: TaskFormData) => {
    const newTask: Todo = {
      id: Math.max(...todos.map(t => t.id), 0) + 1,
      userId: data.userId,
      title: data.title,
      completed: data.completed
    };
    setTodos(prev => [newTask, ...prev]);
    setShowAddModal(false);
  }, [todos, setTodos]);

  const handleEditTask = useCallback((data: TaskFormData) => {
    if (!editingTask) return;
    setTodos(prev => prev.map(todo => 
      todo.id === editingTask.id 
        ? { ...todo, title: data.title, userId: data.userId, completed: data.completed }
        : todo
    ));
    setEditingTask(null);
  }, [editingTask, setTodos]);

  const getUserById = useCallback((userId: number) => {
    return users.find(user => user.id === userId);
  }, [users]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Task Management</h1>
          <p className="text-gray-600">Manage your tasks efficiently with our advanced task management system</p>
        </div>

        {/* Stats */}
        <TaskStats todos={todos} />

        {/* Filters */}
        <TaskFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedUserId={selectedUserId}
          setSelectedUserId={setSelectedUserId}
          showCompleted={showCompleted}
          setShowCompleted={setShowCompleted}
          users={users}
        />

        {/* Add Task Button */}
        <div className="mb-6">
          <Button onClick={() => setShowAddModal(true)} className="flex items-center gap-2">
            <Plus size={20} />
            Add New Task
          </Button>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {currentItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-2">No tasks found</div>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            currentItems.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                user={getUserById(task.userId)}
                users={users}
                onToggleComplete={handleToggleComplete}
                onEdit={setEditingTask}
                onUserAssign={handleUserAssign}
                onUserClick={setSelectedUser}
              />
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            hasNext={hasNext}
            hasPrev={hasPrev}
            totalItems={filteredTodos.length}
            currentItems={currentItems.length}
          />
        )}

        {/* Modals */}
        <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Task">
          <TaskForm
            users={users}
            onSubmit={handleAddTask}
            onCancel={() => setShowAddModal(false)}
          />
        </Modal>

        <Modal isOpen={!!editingTask} onClose={() => setEditingTask(null)} title="Edit Task">
          {editingTask && (
            <TaskForm
              task={editingTask}
              users={users}
              onSubmit={handleEditTask}
              onCancel={() => setEditingTask(null)}
            />
          )}
        </Modal>

        {selectedUser && (
          <UserProfile
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
          />
        )}
      </div>
    </div>
  );
}