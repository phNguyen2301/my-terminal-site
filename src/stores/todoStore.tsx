import { create } from "zustand";


interface TodoStore {
    todos: string[];
    addTodo: (todo: string) => void;
    removeTodo: (index: number) => void;
  }
  
  export const useTodoStore = create<TodoStore>((set) => ({
    todos: [],
    removeTodo: (index) =>
      set((state) => ({ todos: state.todos.filter((_, i) => i !== index) })),
    addTodo: (todo) => {
      set((state) => ({ todos: [...state.todos, todo] }))
    },
  }));