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
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};
const getTodoFromLocalStorage = () => {
  const values = localStorage.getItem(LOCAL_STORAGE_KEY);
  return values ? JSON.parse(values) : [];
};
export default function TodoContextProvider({ children }: PropsWithChildren) {
  const [todos, setTodos] = useState<Todo[]>(getTodoFromLocalStorage());

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);
  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
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
