import {Kalender} from "@/components/calendar/Kalender.tsx";
import {useCallback} from "react";
import type {hariKuliah, CardJadwal} from "@/types/cardJadwal.types.ts";
interface jadwalKuliahResponse{
    kelas:{
        matakuliah:{
            nama_mk:string;
        };
        dosen:{
            pengguna:{
                nama_lengkap:string;
            }
        }
        jadwalKuliah:{
            hari: hariKuliah;
            jam_mulai:string;
            jam_akhir:string;
            ruangan:{
                nama_ruangan:string;
            };
        }[];
    }
}
function formatTime(isoString: string):string{
    const date = new Date(isoString);
    const hours = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minute}`;
}
async function fetchJadwalKuliah(token:string): Promise<CardJadwal[]> {
    const res=await fetch(
        `/api/mahasiswa/class-schedules`, { headers: {
                Authorization: `Bearer ${token}`,
            },});
    if(!res.ok){
        throw new Error(`gagal memuat jadwal kuliah ${res.status}`);
    }
    const data:jadwalKuliahResponse[] = await res.json();
    return data.flatMap((item)=>item.kelas.jadwalKuliah.map((jadwal)=>({
        title:item.kelas.matakuliah.nama_mk,
        participant:item.kelas.dosen.pengguna.nama_lengkap,
        day:jadwal.hari,
        startTime:formatTime(jadwal.jam_mulai),
        endTime:formatTime(jadwal.jam_akhir),
        room:jadwal.ruangan.nama_ruangan
    })))

}
export default function JadwalKuliah() {
    const accessToken=""
    const loadJadwal = useCallback(
        () => fetchJadwalKuliah(accessToken),
        [accessToken],
    );
    return(
        <div className="p-8 flex flex-col gap-8">
            <header className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold tracking-wide">Jadwal Kuliah</h1>
                <p className="text-sm text-[#94A3B8] font-medium">Lihat Jadwal Kuliahmu</p>
            </header>
            <main>
                <Kalender fetchSchedules={loadJadwal}/>
            </main>
        </div>
    )
}