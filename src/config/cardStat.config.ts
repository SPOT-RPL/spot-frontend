import type {getCardConfig, CardConfig, UserRole} from "@/types/CardStat.types.ts";
import { PiStudent,PiChalkboardLight, PiPresentationLight } from "react-icons/pi";
import { BookText } from "lucide-react";
class AdminCardStat implements getCardConfig{
    getConfig(): CardConfig {
        return{
            role:"Admin",
            cards:[
                {
                    title:"BANYAK DOSEN",
                    statistic:30,
                    unit:"Dosen Terdaftar",
                    icon: PiChalkboardLight,
                    path:"/admin/ManajemenDosen"
                },
                {
                    title:"BANYAK MAHASISWA",
                    statistic:30,
                    unit:"Mahasiswa Terdaftar",
                    icon: PiStudent,
                    path:"/admin/ManajemenMahasiswa"
                },
                {
                    title:"PRESENTASI TERJADWAL",
                    statistic:20,
                    unit:"Mata Kuliah",
                    icon: PiPresentationLight,
                    path:"/admin/MataKuliah"
                },
                {
                    title:"BANYAK TUGAS BESAR",
                    statistic:5,
                    unit:"Tugas Besar",
                    icon: BookText,
                    path:"/admin/TugasBesar"
                }

            ]
        }
    }
}
class MahasiswaCardStat implements getCardConfig{
    getConfig(): CardConfig {
        return{
            role:"Mahasiswa",
            cards:[
                {
                    title:"MATA KULIAH AKTIF",
                    statistic:30,
                    unit:"Mata Kuliah",
                    icon: PiChalkboardLight,
                    path:"/mahasisa/MataKuliah"
                },
                {
                    title:"TUGAS BESAR",
                    statistic:30,
                    unit:"Mata Kuliah",
                    icon: PiStudent,
                    path:"/mahasiswa/TugasBesar"
                },
                {
                    title:"PRESENTASI TERJADWAL",
                    statistic:20,
                    unit:"Presentasi",
                    icon: BookText,
                    path:"/mahasiswa/TugasBesar/Jadwal"
                },
                {
                    title:"KELOMPOK TUGAS BESAR",
                    statistic:3/5,
                    unit:"Tugas Besar",
                    icon: BookText,
                    path:"/mahasiswa/MataKuliah"
                }
            ]
        }
    }
}
class DosenCardStat implements getCardConfig{
    getConfig(): CardConfig {
        return{
            role:"Dosen",
            cards:[
                {
                    title:"MATA KULIAH AKTIF",
                    statistic:30,
                    unit:"Mata Kuliah",
                    icon: PiChalkboardLight,
                    path:"/mahasisa/MataKuliah"
                },
                {
                    title:"TUGAS BESAR",
                        statistic:30,
                    unit:"Mata Kuliah",
                    icon: PiStudent,
                    path:"/mahasiswa/TugasBesar"
                },
                {
                    title:"PRESENTASI TERJADWAL",
                    statistic:20,
                    unit:"Presentasi",
                    icon: BookText,
                    path:"/mahasiswa/TugasBesar/Jadwal"
                },
            ]
        }
    }
}
const cardRegistry: Record<UserRole, getCardConfig>={
    Admin: new AdminCardStat(),
    Dosen: new DosenCardStat(),
    Mahasiswa: new MahasiswaCardStat()
}
export function getCard(role: UserRole): CardConfig {
    return cardRegistry[role].getConfig();
}