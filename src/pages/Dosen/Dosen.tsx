import {useMemo} from "react";
import {getCard} from "@/config/cardStat.config.ts";
import Card, { CardContent } from "@/components/card/Card"

import {
    ArrowRight,
    CalendarCheck2,
    CalendarDays,
    Clock3,
    Code2,
    Database,
    Users,
    PlusIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { div } from "framer-motion/client";

// Dummy data nnt hapus aja
const dataDosen = [
  {
    id : 1,
    name : "Vania Natali S.Kom., M.T."
  },
];

const jadwalPresentasi = [
  {
    id: 1,
    title: "Rekayasa Perangkat Lunak",
    date: "Kamis, 26 November 2026",
    startTime: "09:00",
    endTime: "09:30",
    group: "Kelompok 1",
    icon: Code2,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    title: "Basis Data",
    date: "Kamis, 26 November 2026",
    startTime: "10:30",
    endTime: "11:00",
    group: "Kelompok 2",
    icon: Database,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    id: 3,
    title: "Rekayasa Perangkat Lunak",
    date: "Jumat, 27 November 2026",
    startTime: "11:00",
    endTime: "11:30",
    group: "Kelompok 3",
    icon: Code2,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 4,
    title: "Basis Data",
    date: "Jumat, 27 November 2026",
    startTime: "11:30",
    endTime: "12:00",
    group: "Kelompok 4",
    icon: Database,
    color: "bg-emerald-100 text-emerald-600",
  },
];

const aktivitasTerakhir = [
  {
    id: 1,
    title: "Jadwal Presentasi Ditentukan",
    course: "IF101 - Rekayasa Perangkat Lunak",
    datetime: "14 Oktober 2026, 13:00",
    timeAgo: "Kemarin",
    icon: CalendarCheck2,
    color: "bg-green-100 text-green-600",
  },
  {
    id: 2,
    title: "Jadwal Presentasi Ditentukan",
    course: "IF102 - Basis Data",
    datetime: "14 Oktober 2026, 13:00",
    timeAgo: "Kemarin",
    icon: CalendarCheck2,
    color: "bg-green-100 text-green-600",
  },
  {
    id: 3,
    title: "Jadwal Presentasi Diubah",
    course: "IF103 - Pemrograman Berbasis Web",
    datetime: "12 Oktober 2026, 12:00",
    timeAgo: "3 hari lalu",
    icon: CalendarDays,
    color: "bg-amber-100 text-amber-500",
  },
  {
    id: 4,
    title: "Jadwal Presentasi Diubah",
    course: "IF104 - Keamanan Informasi",
    datetime: "12 Oktober 2026, 12:00",
    timeAgo: "3 hari lalu",
    icon: CalendarDays,
    color: "bg-amber-100 text-amber-500",
  },
  {
    id: 5,
    title: "Jadwal Presentasi Ditentukan",
    course: "IF105 - Sistem Operasi",
    datetime: "11 Oktober 2026, 10:00",
    timeAgo: "4 hari lalu",
    icon: CalendarCheck2,
    color: "bg-green-100 text-green-600",
  },
];

export default function Dosen() {
  const role = "Dosen";
  const cardConfig = useMemo(() => getCard(role), [role]);

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 w-full min-w-0 flex flex-col gap-6">
      <header className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-1">
          {dataDosen.map((dosen, index) => (
            <h1 key={dosen.id} className="text-3xl font-bold">Welcome Back, {dosen.name} !
            </h1>
          ))}
        </div>
        <Button variant="third">
          <PlusIcon size={4} /> Tambah Akun
        </Button>
      </header>

      <section className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
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

      <section className="w-full min-w-0">
        <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch">
          <Card padding="md" className="h-full">
            <Card.Header
              title="Jadwal Presentasi Minggu Ini"
              action={
                <ArrowRight className="w-4 h-4 text-gray-500 hover:text-gray-900 transition-colors" />
              }
              actionTo="aktivitas"
            />
            <Card.Content className="flex flex-col gap-3">
              {jadwalPresentasi.map((jadwal, idx) => {
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-gray-200/80 p-3.5 flex items-center gap-5 hover:border-gray-300 transition-colors shadow-2xs"
                  >
                    <div className={`w-14 h-14 shrink-0 rounded-xl flex items-center justify-center ${jadwal.color}`}>
                      <jadwal.icon size={24} />
                    </div>

                    <div 
                    className="flex items-center justify-between gap-3 flex-1 min-w-0">
                      
                    {/* Bagian Kiri : Nama Matkul + Tanggal */}
                    <div className="flex flex-col min-w-0 gap-2">
                      <span className="text-sm md:text-base font-bold text-gray-900 truncate">
                        {jadwal.title}
                      </span>

                      <div className="flex items-center flex-nowrap gap-2 text-gray-500 whitespace-nowrap">
                        <CalendarDays size={16} className="shrink-0"/>
                        <p className="text-[11px] md:text-xs whitespace-nowrap">
                          {jadwal.date}
                        </p>
                      </div>
                    </div>

                    {/* Bagian Kanan : Kelompok sama Waktu jam */}
                    <div className="w-[100px] shrink-0 flex flex-col gap-2">
                      <div className="grid grid-cols-[14px_1fr] items-center gap-2">
                        <Users size={14} className="shrink-0"/>
                        <span className="text-[11px] md:text-xs whitespace-nowrap text-left">
                          {jadwal.group}
                        </span>
                      </div>

                      <div className="grid grid-cols-[14px_1fr] items-center gap-2 text-gray-500">
                        <Clock3 size={14} className="shrink-0"/>
                        <p className="text-[11px] whitespace-nowrap text-left">
                          {jadwal.startTime} - {jadwal.endTime}
                        </p>
                      </div>
                    </div>
                   </div>
                </div>
                );
              })}
            </Card.Content>
          </Card>
          
          {/* Card Kiri */}
          <Card padding="md" className="h-full">
            <Card.Header
              title="Aktivitas Terakhir"
              action={
                <ArrowRight className="w-4 h-4 text-gray-500 hover:text-gray-900 transition-colors" />
              }
              actionTo="jadwal-presentasi"
            />
            <Card.Content className="flex flex-col gap-6">
              {aktivitasTerakhir.map((aktivitas, idx) => {
                const IconCommponent = aktivitas.icon;
                return(
                  <div key={idx} className="flex items-center gap-3 min-w-0">
                    
                    <div className={`w-14 h-14 shrink-0 rounded-xl flex items-center justify-center ${aktivitas.color}`}>
                      <IconCommponent size={24}/>
                    </div>

                    {/* Aktivitas terakhir */}
                    <div className="flex flex-col flex-1 min-w-0 gap-1">
                      <span className="text-[14px] font-semibold text-gray-900">
                        {aktivitas.title}
                      </span>

                      <span className="text-[10px] text-gray-500">
                        {aktivitas.course}
                      </span>

                      <span className="text-[10px] text-gray-500">
                        {aktivitas.datetime}
                      </span>
                    </div>

                    <span className="text-[12px] text-gray-400 whitespace-nowrap self-start">
                      {aktivitas.timeAgo}
                    </span>

                  </div>
                );
              })}
            </Card.Content>
          </Card>

        </div>
      </section>
    </div>
  );
}