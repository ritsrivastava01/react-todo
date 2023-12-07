import Header from "./components/Header";
import "./index.css";
import LeftNavBar from "./components/LeftNavBar";
import TodoPanel from "./components/TodoPanel";
import TodoContextProvider from "./hooks/TodoContextProvider";

function App() {
  return (
    <div className="container mx-auto">
      <TodoContextProvider>
        <Header />
        <div className="pt-4 grid grid-cols-3 gap-4">
          <LeftNavBar />
          <div className="col-span-2">
            <TodoPanel />
          </div>
        </div>
      </TodoContextProvider>
    </div>
  );
}

export default App;
