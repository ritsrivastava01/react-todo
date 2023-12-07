import { useTodoContext } from "../hooks/TodoContextProvider";

export default function Header() {
  const { todos } = useTodoContext();
  return (
    <div className="flex justify-end  py-4 border-b border-slate-900/10">
      <label className="mr-4">
        Completed Todo: {todos.filter((todo) => todo.completed).length}
      </label>
      <a href="./" className="pr-4">
        Todos
      </a>
      <a href="./">My Account</a>
    </div>
  );
}
