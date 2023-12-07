import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const TodoContext = createContext<TodoContextType | null>(null);
const LOCAL_STORAGE_KEY = "react-todo";

export type Todo = {
  title: string;
  completed: boolean;
  id: string;
};

type TodoContextType = {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  toggleTodo: (todoId: string, completed: boolean) => void;
  deleteTodo: (todoOd: string) => void;
};

const getTodoFromLocalStorage = () => {
  const values = localStorage.getItem(LOCAL_STORAGE_KEY);
  return values ? JSON.parse(values) : [];
};
export default function TodoContextProvider({ children }: PropsWithChildren) {
  const [todos, setTodos] = useState<Todo[]>(getTodoFromLocalStorage());

  const addTodo = (todo: Todo) => {
    setTodos((prevTodo: Todo[]) => {
      return [...prevTodo, todo];
    });
  };

  const toggleTodo = (todoId: string, completed: boolean) => {
    setTodos((prevTodos: Todo[]) => {
      return prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, completed } : todo
      );
    });
  };

  const deleteTodo = (todoId: string) => {
    setTodos((prevTodo: Todo[]) => {
      return prevTodo.filter((todo) => todo.id !== todoId);
    });
  };
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);
  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (context === null) {
    throw new Error("useTodoContext must be written in TodoContextProvider");
  }
  return context;
};
