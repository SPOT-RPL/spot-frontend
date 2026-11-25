import { GoSidebarCollapse } from "react-icons/go";
import { useMemo, useState } from "react";
import { getSidebarConfig } from "@/config/sidebar.config";
import { SidebarGroup } from "./SidebarMenu";
import { useLocation } from "react-router";
import type { UserRole } from "@/types/sidebar.types";

export default function Sidebar() {
  const location = useLocation();
  const role: UserRole = location.pathname.startsWith("/mahasiswa")
    ? "Mahasiswa"
    : location.pathname.startsWith("/dosen")
      ? "Dosen"
      : "Admin";
  const [open, setOpen] = useState(true);
  const config = useMemo(() => getSidebarConfig(role), [role]);

  return (
    <aside
      className={`flex flex-col items-center gap-10 h-screen shrink-0 border-r-2 border-gray-200 bg-[#F4F6F8] transition-all duration-300 ease-in-out ${
        open ? "w-64 px-4 py-6" : "w-20 px-2 py-6"
      }`}
    >
      <header className="flex items-center justify-between w-full gap-6 px-2 shrink-0">
        {open && <h1 className="font-bold text-3xl">SPOT</h1>}
        <button
          className="bg-white rounded-full p-2 hover:bg-gray-100 transition-colors cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
        >
          <GoSidebarCollapse
            className={`text-2xl font-medium text-gray-400 w-5 h-5 transition-transform duration-300 ease-in-out ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </header>
      <nav className="w-full flex-1 flex flex-col gap-6 px-2 overflow-y-auto overflow-x-hidden">
        {config.groups.map((group, index) => {
          const isLast = index === config.groups.length - 1;
          return (
            <div
              key={group.groupLabel}
              className={`w-full ${isLast ? "mt-auto" : ""}`}
            >
              <SidebarGroup group={group} open={open} />
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
