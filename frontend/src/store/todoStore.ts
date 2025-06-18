import { create } from "zustand";
import { Todo } from "../types/todo";
import {
  getTodos as fetchTodos,
  createTodo as addTodo,
  updateTodo as modifyTodo,
  deleteTodo as removeTodo,
  uploadFile as uploadTodoFile,
} from "../services/todoService";

type TodoStore = {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  getTodos: () => Promise<void>;
  createTodo: (todo: { title: string; description?: string }) => Promise<void>;
  updateTodo: (id: number, todo: Partial<Todo>) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  uploadFile: (id: number, file: File) => Promise<void>;
};

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  loading: false,
  error: null,

  getTodos: async () => {
    set({ loading: true, error: null });
    try {
      const todos = await fetchTodos();
      set({ todos, loading: false });
    } catch (error: unknown) {
      console.log(error);
      set({ error: "Failed to fetch todos", loading: false });
    }
  },

  createTodo: async (todo) => {
    set({ loading: true, error: null });
    try {
      const newTodo = await addTodo(todo);
      set((state) => ({ todos: [...state.todos, newTodo], loading: false }));
    } catch (error) {
      console.log(error);
      set({ error: "Failed to create todo", loading: false });
    }
  },

  updateTodo: async (id, todo) => {
    set({ loading: true, error: null });
    try {
      const updatedTodo = await modifyTodo(id, todo);
      set((state) => ({
        todos: state.todos.map((t) =>
          t.id === updatedTodo.id ? updatedTodo : t
        ),
        loading: false,
      }));
    } catch (error) {
      console.log(error);
      set({ error: "Failed to update todo", loading: false });
    }
  },

  deleteTodo: async (id) => {
    set({ loading: true, error: null });
    try {
      await removeTodo(id);
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
        loading: false,
      }));
    } catch (error) {
      console.log(error);
      set({ error: "Failed to delete todo", loading: false });
    }
  },

  uploadFile: async (id, file) => {
    set({ loading: true, error: null });
    try {
      const updatedTodo = await uploadTodoFile(id, file);
      set((state) => ({
        todos: state.todos.map((t) =>
          t.id === updatedTodo.id ? updatedTodo : t
        ),
        loading: false,
      }));
    } catch (error) {
      console.log(error);
      set({ error: "Failed to upload file", loading: false });
    }
  },
}));
