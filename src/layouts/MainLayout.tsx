import Sidebar from "@/components/sidebar/Sidebar";
import { Outlet } from "react-router";
export default function MainLayout() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
