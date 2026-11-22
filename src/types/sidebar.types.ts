import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";
export type UserRole = "Admin" | "Dosen" | "Mahasiswa";
export interface SideBarMenuItem {
  label: string;
  path: string;
  icon: LucideIcon | IconType;
}
export interface SideBarMenuGroup {
  groupLabel: string;
  items: SideBarMenuItem[];
}
export interface SidebarConfig {
  role: UserRole;
  groups: SideBarMenuGroup[];
}
export interface ISidebarConfig {
  getConfig(): SidebarConfig;
}
