import Sidebar from "@/components/sidebar/Sidebar";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar />
      <main className="flex-1 min-w-0 h-full overflow-y-auto overflow-x-auto">
        <Outlet />
      </main>
    </div>
  );
}

