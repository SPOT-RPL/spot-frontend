import {Kalender} from "@/components/calendar/Kalender.tsx";

export default function JadwalKuliah() {
    return(
        <div className="p-8 flex flex-col gap-8">
            <header className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold tracking-wide">Jadwal Kuliah</h1>
                <p className="text-sm text-[#94A3B8] font-medium">Lihat Jadwal Kuliahmu</p>
            </header>
            <div>
                <Kalender/>
            </div>
        </div>
    )
}