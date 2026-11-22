import { LoaderCircle } from "lucide-react"
import {useEffect, useState, Fragment} from "react";
import type { CardJadwal } from "@/types/cardJadwal.types.ts";

const DUMMY_JADWAL: CardJadwal[] = [
    {
        title: "Manajemen Proyek",
        participant: "Prof. Dr. Veronica Sri Moertini, Ir., M.T.",
        startTime: "09:30",
        endTime: "10:30",
        day: "Senin",
    },
    {
        title: "Rekayasa Perangkat Lunak",
        participant: "Dr. Budi Santoso, M.Kom.",
        startTime: "08:00",
        endTime: "10:00",
        day: "Selasa",
        room: "Lab Komputer 3",
    },
    {
        title: "Basis Data",
        participant: "Ir. Hendra Wijaya, M.T.",
        startTime: "10:30",
        endTime: "12:00",
        day: "Kamis",
    },
];
const hours = [
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
];
const startHour = 6;
const rowHeight = 100;
const headerHeight = 48
export function Kalender(){
    const [now, setNow]=useState(new Date());
    useEffect(()=>{
        const interval=setInterval(()=>setNow(new Date()), 60000);
        return ()=>clearInterval(interval);
    }, [])
    const currentHours=now.getHours();
    const currentMinutes=now.getMinutes();
    const timeString=`${String(currentHours).padStart(2, "0")}:${String(currentMinutes).padStart(2, "0")}`;
    const isWithinHours = currentHours >= startHour && currentHours <= 18;
    const timeTopPosition = headerHeight + (currentHours - startHour + currentMinutes / 60) * rowHeight;
    const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
    const fullWeek=["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
    const todayDay = fullWeek[now.getDay()];

        return (
        <div className="relative w-full max-h-[80vh] overflow-y-auto border border-[#E5E7EB] rounded-xl bg-white shadow-xs">
            {isWithinHours && (
                <div className="absolute left-0 right-0 z-20 pointer-events-none flex items-center transition-all duration-500" style={{top:`${timeTopPosition}px`}}>
                    <div className="w-[80px] flex justify-center">
                        <span className="bg-[#2563EB] text-white font-bold text-[11px] px-2 py-0.5 rounded-md shadow-sm">{timeString}</span>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-[#2563EB] -ml-1 shrink-0" />
                    <div className="flex-1 h-[2px] bg-[#3B82F6]" />
                </div>
            )}
            <div className="grid grid-cols-[80px_repeat(5,1fr)] w-full ">
                <div className="sticky top-0 z-10 flex justify-center bg-white items-center text-xs border-r border-b border-[#E5E7EB]">WIB</div>
                {days.map((day) => {
                        const isToday=day===todayDay
                            return(
                                <div key={day} className={`sticky top-0 z-10 flex flex-col gap-4 border-r border-b last:border-r-0 border-[#F3F4F6] ${isToday? "bg-[#3B82F6]/15 text-[#2563EB]":"bg-white text-[#4B5563]"}`}>
                                    <div className="text-center font-medium text-sm  py-4">{day}</div>
                                </div>
                            )
                })}
                {hours.map((hour) => (
                    <Fragment key={hour}>
                        <div
                            className="p-2 text-center flex items-center justify-center font-medium text-[#9CA3AF] text-xs border-b border-r border-[#E5E7EB] bg-white h-full min-h-[100px]"
                        >
                            {hour}
                        </div>
                        {days.map((day) => {
                            const scheduleToday=DUMMY_JADWAL.find((item)=> item.day===day && item.startTime.slice(0,2)===hour.slice(0,2))
                            const isToday=day===todayDay
                                return(
                                    <div key={`${day}-${hour}`} className={`min-h-[100px] border-r border-b last:border-r-0 border-[#E5E7EB] justify-center flex flex-col gap-3 p-6 ${isToday?"bg-[#3B82F6]/10":"bg-white"}`}>
                                        {scheduleToday &&(
                                            <div className="flex flex-col gap-2 bg-white rounded-xl p-4 border border-[#E5E7EB] shadow-sm hover:shadow-md transition ">
                                                <h3 className="font-bold text-sm text-[#1F2937] ">{scheduleToday.title}</h3>
                                                <p className="font-semibold text-xs text-[#4D77D7]">{scheduleToday.participant}</p>
                                                <span className="font-medium text-xs mt-1 text-[#6B7280]">{scheduleToday.startTime} - {scheduleToday.endTime}</span>
                                                {scheduleToday.room && (
                                                    <span className="text-[10px] text-gray-400">{scheduleToday.room}</span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )
                        })}
                    </Fragment>
                ))}
            </div>
        </div>

    )
}