import { Toaster } from "react-hot-toast";
import AppRouter from "./router";

function App() {
  return (
    <main className="min-h-screen min-w-[100vw] bg-sky-200 dark:bg-slate-950">
      <Toaster position="top-center" />
      <AppRouter />
    </main>
  );
}

export default App;
