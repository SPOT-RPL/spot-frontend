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
const days=["Senin", "Selasa", "Rabu", "Kamis", "Jumat"]
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
export function Kalender(){

        return (
        <div className="w-full max-h-[80vh] overflow-y-auto border border-[#E5E7EB] rounded-xl bg-white shadow-xs">
            <div className="grid grid-cols-[80px_repeat(5,1fr)] w-full ">
                <div className="sticky top-0 z-10 flex justify-center bg-white items-center text-xs border-r border-b border-[#E5E7EB]">WIB</div>
                {days.map((day) => (

                        <div key={day} className="sticky top-0 z-10 flex flex-col bg-white gap-4 border-r border-b last:border-r-0 border-[#F3F4F6]">
                            <div className="text-center font-medium text-sm text-[#4B5563] py-4">{day}</div>
                        </div>

                ))}
                {hours.map((hour) => (
                    <Fragment key={hour}>
                        <div className="p-2 text-center flex items-center justify-center ont-medium text-[#9CA3AF] text-xs border-b border-r border-[#E5E7EB]">{hour}</div>
                        {days.map((day) => {
                            const scheduleToday=DUMMY_JADWAL.find((item)=> item.day===day && item.startTime.slice(0,2)===hour.slice(0,2))
                                return(
                                    <div key={`${day}-${hour}`} className="min-h-22.5 border-r border-b last:border-r-0 border-[#E5E7EB] justify-center flex flex-col gap-3 p-6">
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