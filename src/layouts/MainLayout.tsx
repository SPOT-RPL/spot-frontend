import Sidebar from "@/components/sidebar/Sidebar";
import { Outlet } from "react-router";
export default function MainLayout() {
  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar />
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  );
}
