import {
  ArrowRight,
  CalendarCheck,
  CalendarSync,
  CircleUserIcon,
  Plus,
  UserRoundPen,
  type LucideIcon,
} from "lucide-react";
import React, { useMemo, type ActivityProps } from "react";
import { getCard } from "@/config/cardStat.config.ts";
import Card from "@/components/card/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type StatusPresentasi = "Terjadwal" | "Pendaftaran" | "Selesai" | "Batal";
type BadgeVariant = "blue" | "yellow" | "green" | "destructive";

interface Activity {
  icon: LucideIcon;
  colorIcon: string;
  colorBox: string;
  title: string;
  description: string;
  datetime: string;
}

interface Presentasi {
  mataKuliah: string;
  dosen: string;
  date: string;
  time: string;
  status: StatusPresentasi;
}

const aktivitasData: Activity[] = [
  {
    icon: UserRoundPen,
    colorIcon: "text-green-800",
    colorBox: "bg-green-200",
    title: "Admin mengubah data dosen",
    description: "Aldo Bagaskara (Email: Aldo@unpar.ac.id)",
    datetime: "13 Oktober 2026 - 13.00 WIB",
  },
  {
    icon: CalendarCheck,
    colorIcon: "text-blue-800",
    colorBox: "bg-blue-200",
    title: "Menambahkan jadwal presentasi",
    description: "Mata Kuliah: Rekayasa Perangkat Lunak",
    datetime: "13 Oktober 2026 - 13.00 WIB",
  },
  {
    icon: CalendarSync,
    colorIcon: "text-yellow-800",
    colorBox: "bg-yellow-200",
    title: "Mengubah urutan presentasi",
    description: "Mata Kuliah: Teknik Presentasi",
    datetime: "13 Oktober 2026 - 13.00 WIB",
  },
  {
    icon: CircleUserIcon,
    colorIcon: "text-red-800",
    colorBox: "bg-red-200",
    title: "Menghapus data dosen",
    description: "Husnul Hakim (Email: husnul.hakim@unpar.ac.id)",
    datetime: "13 Oktober 2026 - 13.00 WIB",
  },
];

const statusBadgeVariant: Record<StatusPresentasi, BadgeVariant> = {
  Pendaftaran: "yellow",
  Terjadwal: "blue",
  Selesai: "green",
  Batal: "destructive",
};

const jadwalPresentasiData: Presentasi[] = [
  {
    mataKuliah: "Rekayasa Perangkat Lunak (Kelas A)",
    dosen: "Vania Natali, S.Kom., M.T.",
    date: "Kamis, 24 Oktober 2026",
    time: "09:00 - 10.30",
    status: "Pendaftaran",
  },
  {
    mataKuliah: "Rekayasa Perangkat Lunak (Kelas A)",
    dosen: "Vania Natali, S.Kom., M.T.",
    date: "Kamis, 24 Oktober 2026",
    time: "09:00 - 10.30",
    status: "Terjadwal",
  },
  {
    mataKuliah: "Rekayasa Perangkat Lunak (Kelas A)",
    dosen: "Vania Natali, S.Kom., M.T.",
    date: "Kamis, 24 Oktober 2026",
    time: "09:00 - 10.30",
    status: "Selesai",
  },
  {
    mataKuliah: "Rekayasa Perangkat Lunak (Kelas A)",
    dosen: "Vania Natali, S.Kom., M.T.",
    date: "Kamis, 24 Oktober 2026",
    time: "09:00 - 10.30",
    status: "Batal",
  },
];

export default function Admin() {
  const role = "Admin";
  const cardConfig = useMemo(() => getCard(role), [role]);

  return (
    <main className="px-8 py-12 w-full flex flex-col gap-6">
      <header className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="font-medium text-sm text-gray-400">
            Pantau sistem dan masukkan data jadwal
          </p>
        </div>
        <button className="flex gap-3 items-center bg-[#F4D35E] font-bold text-sm px-3 py-2 rounded-xl">
          <Plus className="h-4 w-4" />
          <span>Import Data</span>
        </button>
      </header>

      <section className="w-full flex-1 min-h-0 overflow-hidden grid grid-cols-4 gap-6">
        {cardConfig.cards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <Card key={index}>
              <Card.Content>
                <div className="flex justify-between items-center w-full">
                  <span className="text-xs font-bold tracking-widest uppercase text-[#545454] ">
                    {card.title}
                  </span>
                  <div className="w-8 h-8 flex justify-center items-center bg-[#E2E8F0] rounded-lg">
                    <IconComponent size={20} />
                  </div>
                </div>
                <div className="text-5xl font-extrabold text-[#1E1E1E]">
                  {card.statistic}
                </div>
                <div className="text-xs font-medium text-[#757575]">
                  {card.unit}
                </div>
              </Card.Content>
              <Card.Footer to={card.path}></Card.Footer>
            </Card>
          );
        })}
      </section>

      <section className="w-full flex flex-col gap-8 min-h-screen">
        <div className="w-full grid grid-cols-2 gap-6">
          <Card padding="md" className="h-full">
            <Card.Header
              title="Aktivitas Terakhir"
              action={
                <ArrowRight className="w-4-h-4 text-gray-500 hover:text-gray-900 transition-colors" />
              }
              actionTo="aktivitas"
            />
            <Card.Content className="flex flex-col gap-3">
              {aktivitasData.map((activity, idx) => {
                const IconComponent = activity.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-gray-200/80 p-3.5 flex items-center gap-5 hover:border-gray-300 transition-colors shadow-2xs"
                  >
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${activity.colorBox}`}
                    >
                      <IconComponent
                        className={`w-5 h-5 ${activity.colorIcon}`}
                      />
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="font-bold text-base text-gray-900 truncate">
                        {activity.title}
                      </span>
                      <div className="text-sm text-gray-600 truncate mt-0.5">
                        <div className="flex items-center gap-2">
                          {activity.description}
                        </div>
                      </div>
                      <div className="text-[10px] font-semibold text-indigo-300 mt-2">
                        {activity.datetime}
                      </div>
                    </div>
                  </div>
                );
              })}
            </Card.Content>
          </Card>
          <Card padding="md" className="h-full">
            <Card.Header
              title="Jadwal Presentasi"
              action={
                <ArrowRight className="w-4-h-4 text-gray-500 hover:text-gray-900 transition-colors" />
              }
              actionTo="jadwal-presentasi"
            />
            <Card.Content>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mata Kuliah</TableHead>
                    <TableHead>Dosen Pengampu</TableHead>
                    <TableHead>Jadwal</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jadwalPresentasiData.map((jadwal, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{jadwal.mataKuliah}</TableCell>
                      <TableCell>{jadwal.dosen}</TableCell>
                      <TableCell>
                        <div>
                          {jadwal.date}
                        </div>
                        <div>
                          {jadwal.time}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusBadgeVariant[jadwal.status]}>
                          {jadwal.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card.Content>
          </Card>
        </div>
      </section>
    </main>
  );
}
