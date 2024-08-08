import { Outlet } from "react-router-dom";

export function RootRoute() {
  return (
    <div className="flex flex-col h-screen">
      <Outlet />
    </div>
  );
}
