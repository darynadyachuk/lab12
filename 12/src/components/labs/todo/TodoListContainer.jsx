import { useEffect, useCallback } from "react";
import TodoList from "./TodoList";
import { useTodoStore } from "../../../hooks/useTodoStore";

export default function TodoListContainer() {
  const {
    todos,
    isLoading,
    error,
    searchTerm,
    currentPage,
    limitPerPage,
    fetchTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    setSearchTerm,
    setCurrentPage,
  } = useTodoStore();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAddTodo = useCallback((text) => addTodo(text), [addTodo]);
  const handleToggleTodo = useCallback((id) => toggleTodo(id), [toggleTodo]);
  const handleDeleteTodo = useCallback((id) => deleteTodo(id), [deleteTodo]);
  const handleEditTodo = useCallback((id, newTitle) => editTodo(id, newTitle), [editTodo]);
  const handleSearchChange = useCallback((term) => setSearchTerm(term), [setSearchTerm]);

  const totalTodos = todos.filter((todo) =>
    todo.todo.toLowerCase().includes(searchTerm.toLowerCase())
  ).length;

  const paginatedTodos = todos
    .filter((todo) => todo.todo.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage);

  const goToNextPage = () => {
    if (currentPage < Math.ceil(totalTodos / limitPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <TodoList
      todos={paginatedTodos}
      isLoading={isLoading}
      error={error}
      onAddTodo={handleAddTodo}
      onToggleTodo={handleToggleTodo}
      onDeleteTodo={handleDeleteTodo}
      onEditTodo={handleEditTodo}
      searchTerm={searchTerm}
      onSearchChange={handleSearchChange}
      currentPage={currentPage}
      totalTodos={totalTodos}
      limitPerPage={limitPerPage}
      onNextPage={goToNextPage}
      onPrevPage={goToPrevPage}
    />
  );
}