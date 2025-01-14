function Loader() {
  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-4 bg-neutral-300 dark:bg-slate-700">
      <img src="/logo.png" alt="logo" className="h-24 w-24 animate-pulse" />
      <div className="loader"></div>
    </div>
  );
}

export default Loader;
