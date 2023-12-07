import { FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Todo, useTodoContext } from "../hooks/TodoContextProvider";
import { Trash } from "phosphor-react";

export default function TodoPanel() {
  const [todoName, setTodoName] = useState<string>("");
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodoContext();

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo({
      title: todoName,
      completed: false,
      id: uuidv4(),
    });
    setTodoName("");
  };

  return (
    <>
      <form className="flex flex-col" onSubmit={submitHandler}>
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

      {todos.map((todo: Todo) => (
        <div
          className="flex w-full justify-between my-3 border-b border-slate-900/10"
          key={todo.id}
        >
          <label
            className={`prose prose-h1 hover:font-bold cursor-pointer ${
              todo.completed ? "line-through" : ""
            }`}
          >
            <input
              type="checkbox"
              className="mr-4"
              checked={todo.completed}
              onChange={(e) => toggleTodo(todo.id, e.target.checked)}
              id={todo.id}
            />
            {todo.title}
          </label>
          <Trash
            className="pt-1 "
            size={23}
            onClick={() => deleteTodo(todo.id)}
          />
        </div>
      ))}
    </>
  );
}
