import { create } from "zustand";
import { todoService } from "../services/todoService";

export const useTodoStore = create((set) => ({
  todos: [],
  isLoading: false,
  error: null,
  searchTerm: "",
  currentPage: 1,
  limitPerPage: 5,

  fetchTodos: async () => {
    set({ isLoading: true, error: null });

    try {
      const todos = await todoService.getTodos();

      const safeTodos = todos.map((todo) => ({
        ...todo,
        id: crypto.randomUUID(),
      }));

      set({ todos: safeTodos, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  addTodo: async (text) => {
    try {
      const data = await todoService.addTodo(text);

      const safeTodo = {
        ...data,
        id: crypto.randomUUID(),
      };

      set((state) => ({
        todos: [safeTodo, ...state.todos],
      }));
    } catch (err) {
      set({ error: err.message });
    }
  },

  addLocalTodo: (text) => {
    const newTodo = {
      id: crypto.randomUUID(),
      todo: text,
      completed: false,
    };

    set((state) => ({
      todos: [newTodo, ...state.todos],
    }));
  },

  toggleTodo: (id) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      ),
    }));
  },

  deleteTodo: (id) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  },

  editTodo: (id, newTitle) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id
          ? { ...todo, todo: newTitle }
          : todo
      ),
    }));
  },

  setSearchTerm: (term) =>
    set({ searchTerm: term, currentPage: 1 }),

  setCurrentPage: (page) =>
    set({ currentPage: page }),

  setLimitPerPage: (limit) =>
    set({ limitPerPage: limit, currentPage: 1 }),
}));