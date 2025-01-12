import { Toaster } from "react-hot-toast";
import AppRouter from "./router";

function App() {
  return (
    <main className="h-auto min-w-[100vw] overflow-y-hidden bg-sky-200 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Toaster position="top-center" />
      <AppRouter />
    </main>
  );
}

export default App;
