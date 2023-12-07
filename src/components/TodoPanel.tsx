import { FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Todo, useTodoContext } from "../hooks/TodoContextProvider";

export default function TodoPanel() {
  const [todoName, setTodoName] = useState<string>("");
  const { todos, setTodos } = useTodoContext();
  const addTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodos((prevTodo: Todo[]) => {
      return [
        ...prevTodo,
        {
          title: todoName,
          completed: false,
          id: uuidv4(),
        },
      ];
    });
    setTodoName("");
  };
  const toggleTodo = (todoId: string, completed: boolean) => {
    setTodos((prevTodos: Todo[]) => {
      return prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, completed } : todo
      );
    });
    // setTodos((prevTodo: Todo[]) => {
    //   return prevTodo.map((todo) =>
    //     todo.id === todoId ? { ...todo, completed } : todo
    //   );
    // });
  };

  return (
    <>
      <form className="flex flex-col" onSubmit={addTodo}>
        <input
          type="text"
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
          className="border border-slate-900/10 rounded py-2 px-4"
          placeholder="Add a new todo"
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
          Add
        </button>
      </form>
      <ul className="list-none">
        {todos.map((todo: Todo) => (
          <div className="flex flex-row" key={todo.id}>
            <label className="prose prose-h1 hover:font-bold cursor-pointer">
              <input
                type="checkbox"
                className="mr-4"
                checked={todo.completed}
                onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                id={todo.id}
              />
              {todo.title}
            </label>
          </div>
        ))}
      </ul>
    </>
  );
}
