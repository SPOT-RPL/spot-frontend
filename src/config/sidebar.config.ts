import type {
  ISidebarConfig,
  SidebarConfig,
  UserRole,
} from "@/types/sidebar.types";
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  BookOpenText,
  ListCheck,
  CalendarClock,
  CalendarRange,
  BookBookmark,
  Settings,
  LogOut,
} from "lucide-react";
class AdminSidebar implements ISidebarConfig {
  getConfig(): SidebarConfig {
    return {
      role: "Admin",
      groups: [
        {
          groupLabel: "UTAMA",
          items: [
            {
              label: "Dashboard",
              path: "/admin",
              icon: LayoutDashboard,
            },
            {
              label: "Manajemen Mahasiswa",
              path: "/admin/ManajemenMahasiswa",
              icon: GraduationCap,
            },
            {
              label: "Manajemen Dosen",
              path: "/admin/ManajemenDosen",
              icon: Users,
            },
            {
              label: "Tugas Besar",
              path: "/admin/TugasBesar",
              icon: BookOpenText,
            },
            {
              label: "Aktivitas Pengguna",
              path: "/admin/Aktivitas",
              icon: ListCheck,
            },
          ],
        },
        {
          groupLabel: "Lainnya",
          items: [
            {
              label: "Pengaturan",
              path: "/admin/Pengaturan",
              icon: Settings,
            },
            {
              label: "Keluar",
              path: "/admin/Login",
              icon: LogOut,
            },
          ],
        },
      ],
    };
  }
}
class MahasiswaSidebar implements ISidebarConfig {
  getConfig(): SidebarConfig {
    return {
      role: "Mahasiswa",
      groups: [
        {
          groupLabel: "UTAMA",
          items: [
            { label: "Dashboard", path: "/mahasiswa", icon: LayoutDashboard },
            {
              label: "Tugas Besar",
              path: "/mahasiswa/TugasBesar",
              icon: BookOpenText,
            },
            {
              label: "Jadwal Kuliah",
              path: "/mahasiswa/JadwalKuliah",
              icon: CalendarClock,
            },
            {
              label: "Jadwal Ujian",
              path: "/mahasiswa/JadwalUjian",
              icon: CalendarClock,
            },
            {
              label: "MataKuliah",
              path: "/mahasiswa/MataKuliah",
              icon: BookBookmark,
            },
          ],
        },
        {
          groupLabel: "Lainnya",
          items: [
            {
              label: "Pengaturan",
              path: "/mahasiswa/Pengaturan",
              icon: Settings,
            },
            {
              label: "Keluar",
              path: "/Login",
              icon: LogOut,
            },
          ],
        },
      ],
    };
  }
}
class DosenSidebar implements ISidebarConfig {
  getConfig(): SidebarConfig {
    return {
      role: "Dosen",
      groups: [
        {
          groupLabel: "UTAMA",
          items: [
            { label: "Dashboard", path: "/dosen", icon: LayoutDashboard },
            {
              label: "Tugas Besar",
              path: "/dosen/TugasBesar",
              icon: BookOpenText,
            },
            {
              label: "Jadwal Mengajar",
              path: "/dosen/JadwalMengajar",
              icon: CalendarClock,
            },
            {
              label: "Jadwal Ujian",
              path: "/dosen/JadwalUjian",
              icon: CalendarRange,
            },
          ],
        },
        {
          groupLabel: "Lainnya",
          items: [
            {
              label: "Pengaturan",
              path: "/dosen/Pengaturan",
              icon: Settings,
            },
            {
              label: "Keluar",
              path: "/Login",
              icon: LogOut,
            },
          ],
        },
      ],
    };
  }
}
const sidebarRegistry: Record<UserRole, ISidebarConfig> = {
  Admin: new AdminSidebar(),
  Dosen: new DosenSidebar(),
  Mahasiswa: new MahasiswaSidebar(),
};

export function getSidebarConfig(role: UserRole): SidebarConfig {
  return sidebarRegistry[role].getConfig();
}
