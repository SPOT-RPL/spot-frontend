import { Search, Dot, UserRound} from "lucide-react"
import {Input} from "@/components/ui/input.tsx"
import {Select, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import Card, {CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/Card.tsx";
import {useEffect, useState} from "react";
export default function TugasBesar(){
    const statusStyle={
        Terjadwal:{
            label:"Terjadwal",
            textStyle:"text-[#4D77D7]",
            bgStyle:"bg-[#DCECF8]",
            dotStyle:"text-[#4D77D7]",
        },
        Pendaftaran:{
            label: "Pendaftaran",
            textStyle:"text-[#92400E]",
            bgStyle:"bg-[#FFFBEB]",
            dotStyle:"text-[#F59E0B]",
        },
        Penjadwalan: {
            label: "Penjadwalan",
            textStyle: "text-[#4D77D7]",
            bgStyle: "bg-[#DCECF8]",
            dotStyle: "text-[#4D77D7]",
        },
        Presentasi: {
            label: "Presentasi",
            textStyle: "text-[#4D77D7]",
            bgStyle: "bg-[#DCECF8]",
            dotStyle: "text-[#4D77D7]",
        },
        Selesai:{
            label: "Selesai",
            textStyle:"text-[#059669]",
            bgStyle:"bg-[#ECFDF5]",
            dotStyle:"text-[#28B676]",
        }
    }
    type TugasStatus = keyof typeof statusStyle
    interface TugasBesarResponse{
        id_tubes:number;
        deskripsi: string;
        statusPendaftaran: TugasStatus;
        kelas: {
            matakuliah: {
                nama_mk: string;
            };
            dosen: {
                pengguna: {
                    nama_lengkap: string;
                };
            };
        };
    }
    interface tugasItem {
        id:number;
        subject: string
        lecturer: string
        status: TugasStatus
    }
    async function fetchTugasBesar(token:string):Promise<tugasItem[]>{
        const res=await fetch(`/api/mahasiswa/projects`, { headers: {
                Authorization: `Bearer ${token}`,
            },})
        if(!res.ok){
            throw new Error(`gagal memuat tugas besar ${res.status}`)
        }
        const dataTubes:TugasBesarResponse[]=await res.json()
        return dataTubes.map((item)=>({
            id: item.id_tubes,
            subject: item.deskripsi,
            lecturer: item.kelas.dosen.pengguna.nama_lengkap,
            status: item.statusPendaftaran,
        }))
    }
    const [tugasBesar, setTugasBesar] = useState<tugasItem[]>([]);
    const accessToken = ""

    useEffect(() => {
        if (!accessToken) return;

        fetchTugasBesar(accessToken)
            .then(setTugasBesar)
            .catch(console.error);
    }, [accessToken]);

    return(
        <div className="p-8 flex flex-col gap-8 w-full">
            <header className="flex items-center justify-between w-full">
                <div className="flex-1 w-full">
                    <h1 className="text-2xl font-bold tracking-wide">Tugas Besar</h1>
                    <p className="font-medium text-sm text-[#94A3B8] whitespace-nowrap">Pantau seluruh tugas besar yang dijadwalkan untukmu</p>
                </div>
                <div className="flex-1 flex gap-2">
                    <div className="relative flex items-center gap-3">
                        <Search className="w-5 h-5 absolute left-1.5 "/>
                        <Input type="search" className="w-80 text-right text-[#94A3B8]" placeholder="Cari mata kuliah tugasmu"/>
                    </div>
                    <div className="ml-3">
                        <Select>
                            <SelectTrigger>
                                <SelectValue>Filter</SelectValue>
                            </SelectTrigger>
                        </Select>
                    </div>
                </div>
            </header>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {tugasBesar.map((data, index)=>{
                    const statusConfig=statusStyle[data.status]
                    return(

                            <Card variant="outline" key={index}>
                                <CardContent className="gap-2">
                                    <CardHeader>
                                        <CardTitle size="md">Semester Ganjil 2024/2025</CardTitle>
                                        <div className={`flex items-center px-2.5 py-0.5 rounded-2xl font-semibold text-sm ${statusConfig.bgStyle} ${statusConfig.dotStyle}`}><Dot className="w-7 h-7"/><span className={statusConfig.textStyle}>{statusConfig.label}</span></div>
                                    </CardHeader>
                                    <h3 className="text-2xl font-bold tracking-wide capitalize">{data.subject}</h3>
                                    <CardDescription className="flex items-center gap-2 font-medium text-[#757575] text-sm"><UserRound className="w-4 h-4"/>{data.lecturer}</CardDescription>
                                    <CardDescription className="text-xs font-regular">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vehicula...</CardDescription>
                                </CardContent>
                                <CardFooter className="border-t border-[#F1F5F9]" text="Lihat Detail" to={`/mahasiswa/TugasBesar/${data.id}`}/>
                            </Card>
                    )
                })}
            </div>
        </div>
    )
}