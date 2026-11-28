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
        title: "Manajemen Proyek",
        participant: "Prof. Dr. Veronica Sri Moertini, Ir., M.T.",
        startTime: "09:30",
        endTime: "10:30",
        day: "Senin",
    },
    {
        title: "Manajemen Proyek",
        participant: "Prof. Dr. Veronica Sri Moertini, Ir., M.T.",
        startTime: "10:30",
        endTime: "11:00",
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
const rowHeight = 160;
interface KalenderProps {
    fetchSchedules: () => Promise<CardJadwal[]>;
}
export function Kalender({fetchSchedules}:KalenderProps){
    const [now, setNow]=useState(new Date());
    const [schedules, setSchedules] = useState<CardJadwal[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(true);
        fetchSchedules()
            .then(setSchedules)
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }, [fetchSchedules]);
    useEffect(()=>{
        const interval=setInterval(()=>setNow(new Date()), 60000);
        return ()=>clearInterval(interval);
    }, [])
    const currentHours=now.getHours();
    const currentMinutes=now.getMinutes();
    const timeString=`${String(currentHours).padStart(2, "0")}:${String(currentMinutes).padStart(2, "0")}`;
    const isWithinHours = currentHours >= startHour && currentHours <= 18;
    const totalHeight=hours.length*rowHeight;
    function timeToPixels(time: string):number {
        const [h, m]=time.split(":").map(Number);
        return (h+m/60-startHour)*rowHeight;
    }

    const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
    const fullWeek=["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
    const todayDay = fullWeek[now.getDay()];

        return (
            <div className="relative w-full max-h-[80vh] overflow-y-auto border border-[#E5E7EB] rounded-xl bg-white shadow-xs">

                {/* ── Sticky header ── */}
                <div className="sticky top-0 z-10 grid grid-cols-[80px_repeat(5,1fr)] border-b border-[#E5E7EB]">
                    <div className="flex justify-center items-center text-xs py-3 border-r border-[#E5E7EB] bg-white">WIB</div>
                    {days.map(day => (
                        <div key={day} className={`text-center font-medium text-sm py-4 border-r last:border-r-0 ${day === todayDay ? "bg-[#3B82F6]/15 text-[#2563EB]" : "bg-white text-[#4B5563]"}`}>
                            {day}
                        </div>
                    ))}
                </div>

                <div className="relative grid grid-cols-[80px_repeat(5,1fr)]" style={{ height: `${totalHeight}px` }}>

                    {isWithinHours && (
                        <div className="absolute left-0 right-0 z-20 pointer-events-none flex items-center"
                             style={{ top: `${timeToPixels(`${currentHours}:${currentMinutes}`)}px` }}>
                            <div className="w-[80px] flex justify-center">
                                <span className="bg-[#2563EB] text-white font-bold text-[11px] px-2 py-0.5 rounded-md">{timeString}</span>
                            </div>
                            <div className="w-2 h-2 rounded-full bg-[#2563EB] -ml-1 shrink-0" />
                            <div className="flex-1 h-[2px] bg-[#3B82F6]" />
                        </div>
                    )}

                    <div className="relative border-r border-[#E5E7EB]">
                        {hours.map((hour, i) => (
                            <div key={hour} className="absolute w-full flex justify-center border-b border-[#E5E7EB] items-start pt-2 text-xs text-[#9CA3AF] font-medium"
                                 style={{ top: `${i * rowHeight}px`, height: `${rowHeight}px` }}>
                                {hour}
                            </div>
                        ))}
                    </div>

                    {days.map(day => {
                        const isToday = day === todayDay;
                        const scheduleData = schedules.filter(item => item.day === day);
                        const startTimeCount: Record<string, number> = {};
                        return (
                            <div key={day} className={`relative border-r last:border-r-0 border-[#E5E7EB] ${isToday ? "bg-[#3B82F6]/10" : ""}`}>

                                {hours.map((_, i) => (
                                    <div key={i} className="absolute w-full border-b border-[#E5E7EB]"
                                         style={{ top: `${top}px`, height: `${rowHeight}px` }} />
                                ))}

                                {scheduleData.map((schedule, i) => {
                                    const duplicateIndex = startTimeCount[schedule.startTime] ?? 0;
                                    startTimeCount[schedule.startTime] = duplicateIndex + 1;
                                    const top = timeToPixels(schedule.startTime) + duplicateIndex * 56;
                                    return (
                                        <div key={i}
                                             className="absolute left-1 right-1 z-10 flex flex-col justify-center gap-1 bg-white border-2 border-[#E5E7EB] rounded-xl p-3 hover:shadow-md transition overflow-hidden"
                                             style={{ top: `${top}px`,
                                                 zIndex: 10 + duplicateIndex, }}>
                                            <h3 className="font-bold text-sm text-[#1F2937] leading-tight">{schedule.title}</h3>
                                            <p className="font-semibold text-xs text-[#4D77D7]">{schedule.participant}</p>
                                            <span className="font-medium text-xs text-[#6B7280]">{schedule.startTime} - {schedule.endTime}</span>
                                            {schedule.room && <span className="text-[10px] text-gray-400">{schedule.room}</span>}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}

                </div>
            </div>

    )
}