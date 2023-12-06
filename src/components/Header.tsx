import { todos } from "./TodoPanel";

export default function Header() {
  return (
    <div className="flex justify-end  py-4 border-b border-slate-900/10">
      <div className="mr-4">
        Completed Todos: {todos.value.filter((todo) => todo.completed).length}
      </div>
      <a href="./" className="pr-4">
        Todos
      </a>
      <a href="./">My Account</a>
    </div>
  );
}
