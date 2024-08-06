import { Outlet } from "react-router-dom";

export function RootRoute() {
  return (
    <div className="flex flex-col h-screen">
      <div>
        <header></header>
      </div>

      <div>
        <Outlet />
      </div>

      <div>
        <footer></footer>
      </div>
    </div>
  );
}
