import { GoSidebarCollapse } from "react-icons/go";
import { useMemo, useState } from "react";
import { getSidebarConfig } from "@/config/sidebar.config";
import { SidebarGroup } from "./SidebarMenu";
export default function Sidebar() {
  const role = "Admin";
  const [open, setOpen] = useState(true);
  const config = useMemo(() => getSidebarConfig(role), [role]);
  return (
    <>
      <aside
        className={`flex flex-col items-center gap-10 p-8 h-screen py-2 border-r-2 bg-[#F4F6F8] ${open ? "w-64" : "w-20"}`}
      >
        <header className="flex items-center justify-between w-full gap-6">
          {open && <h1 className="font-bold text-3xl">SPOT</h1>}
          <button
            className="bg-white rounded-full p-2"
            onClick={() => setOpen((prev) => !prev)}
          >
            <GoSidebarCollapse
              className={`text-2xl font-medium text-gray-400 w-5 h-5 transition-transform duration-300 ease-in-out   ${open ? "rotate-180" : ""}`}
            />
          </button>
        </header>
        <nav className="flex-1 flex flex-col gap-6 px-2">
          {config.groups.map((group, index) => {
            const isLast = index === config.groups.length - 1;
            return (
              <div key={group.groupLabel} className={isLast ? "mt-auto" : ""}>
                <SidebarGroup group={group} open={open} />
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
