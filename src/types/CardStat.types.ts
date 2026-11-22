export type UserRole = "Admin" | "Dosen"| "Mahasiswa";
import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";
export interface CardDetails {
    title:string;
    statistic: number;
    unit:string;
    icon:IconType|LucideIcon;
    path?: string;
}
export interface CardConfig {
    role: UserRole;
    cards: CardDetails[];
}
export interface getCardConfig {
    getConfig(): CardConfig;
}