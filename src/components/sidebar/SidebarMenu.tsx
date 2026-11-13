import React from "react";
import type { SideBarMenuItem, SideBarMenuGroup } from "@/types/sidebar.types";
import { NavLink } from "react-router";
const SidebarItem = React.memo(
  ({ item, open }: { item: SideBarMenuItem; open: boolean }) => {
    const Icon = item.icon;
    return (
      <NavLink
        to={item.path}
        title={open ? item.label : undefined}
        className={({ isActive }) =>
          `flex flex-row rounded-xl text-sm whitespace-nowrap font-medium transition-colors ${isActive ? "bg-white text-gray-900 shadow-sm" : "text-[#64748B] hover:text-gray-900"} ${open ? "px-4 py-2 gap-4" : "justify-center p-2"}`
        }
      >
        <Icon className="w-5 h-5 shrink-0" />
        {open && <span>{item.label}</span>}
      </NavLink>
    );
  },
);
const SidebarGroup = React.memo(
  ({ group, open }: { group: SideBarMenuGroup; open: boolean }) => {
    return (
      <div className="flex flex-col gap-1">
        {open ? (
          <span className="px-4 text-sm font-semibold text-gray-400 tracking-widest mb-1">
            {group.groupLabel}
          </span>
        ) : (
          <div className="h-px bg-gray-200 my-1 mx-2" />
        )}
        {group.items.map((item) => (
          <SidebarItem key={item.path} item={item} open={open} />
        ))}
      </div>
    );
  },
);
export { SidebarGroup, SidebarItem };
