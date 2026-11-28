import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbList, BreadcrumbPage} from "@/components/ui/breadcrumb.tsx";
import Card, {CardContent, CardFooter, CardHeader} from "@/components/ui/Card.tsx";
import {Dot, Funnel, Search} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
export default function DetailTugasBesar(){
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
    interface detailTubesResponse{
        id_tubes:number;
        id_kelas:number;
        jumlah_kel:number;
        maksimal_kel:number;
        pendaftaran_mulai:string;
        pendaftaran_akhir:string;
        statusPendaftaran: TugasStatus;
        kelas: {
            nama_kelas:string;
            matakuliah:{
                nama_mk:string;
            }
            dosen: {
                pengguna: {
                    nama_lengkap: string;
                };
            };
        };
        kelompok:string[];
    }

    const {projectId} = useParams();
    async function fetchDetailTubes(token:string, id:string):Promise<detailTubesResponse>{
        const res=await fetch(`/api/mahasiswa/projects/${id}`,
            {
                headers: {
                Authorization: `Bearer ${token}`,
            }})
        if(!res.ok){
            throw new Error(`gagal memuat detail tugas besar ${res.status}` );
        }
        return res.json();
    }
    const [detailTubes, setDetail]=useState<detailTubesResponse|null>(null);
    const accessToken="";
    useEffect(()=>{
        if (!accessToken || !projectId) return;
        fetchDetailTubes(accessToken, projectId).then(setDetail).catch(console.error);
    },[accessToken, projectId]);
    if (!detailTubes) {
        return <main className="p-8">Memuat detail tugas besar...</main>;
    }
    const {statusPendaftaran}=detailTubes;
    const statusConfig=statusStyle[statusPendaftaran];
    return(
        <main className="p-8 flex flex-col gap-8">
            {/*ringkasan info tubes*/}
            <div className="grid grid-cols-4 border-1 border-[#E5E7EB] rounded-xl  w-full">
                {/*dosen*/}
                <div className="flex flex-col gap-1 p-4 border-r border-[#E5E7EB]">
                    <span className="text-sm font-medium tracking-wider text-[#64748B]">Dosen</span>
                    <span className="text-md font-semibold text-[#1E293B]">{detailTubes.kelas.dosen.pengguna.nama_lengkap}</span>
                </div>
                {/*waktu*/}
                <div className="flex flex-col gap-1 p-4 border-r border-[#E5E7EB]">
                    <span className="text-sm font-medium tracking-wider text-[#64748B]">Waktu</span>
                    <span className="text-md font-semibold text-[#1E293B]">Belum Terjadwal</span>
                </div>
                {/*kelas*/}
                <div className="flex flex-col gap-1 p-4 border-r border-[#E5E7EB]">
                    <span className="text-sm font-medium tracking-wider text-[#64748B]">Kelas</span>
                    <span className="text-md font-semibold text-[#1E293B]">{detailTubes.kelas.nama_kelas}</span>
                </div>
                {/*status*/}
                <div className="flex flex-col gap-1 p-4">
                    <span className="text-sm font-medium tracking-wider text-[#64748B]">Status</span>
                    <span className={`w-fit flex items-center gap-2 text-md font-semibold text-[#1E293B] px-2.5 py-0.5 rounded-2xl ${statusConfig.textStyle} ${statusConfig.bgStyle} ${statusConfig.dotStyle}`}><Dot className="w-7 h-7"/>{statusConfig.label}</span>
                </div>
            </div>
        {/*    separator*/}
            <div className="w-full h-[1.65px] border-2 border-[#F1F5F9] rounded-lg"></div>
            {/*data kelompok*/}
            <section>
                {/*search & filter*/}
                <Card variant={"outline"}>
                    <CardHeader className="text-base flex justify-between items-center">
                        <div className="relative flex items-center gap-3">
                            <Search className="w-4 h-4 absolute left-1.5 "/>
                            <Input type="search" className="pl-8 w-80 text-[#94A3B8] bg-white/75 border border-[#E2E8F0]" placeholder="Cari mata kuliah"/>
                        </div>
                        <div className="ml-3">
                            <Select>
                                <SelectTrigger icon={<Funnel className="w-4 h-4 text-black"/>} className="bg-[#CBD5E1]/60">
                                    <SelectValue className="font-semibold text-[#1E1E1E]">Filter</SelectValue>
                                </SelectTrigger>
                            </Select>
                        </div>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card variant={"outline"} className="p-6 max-w-[365px]">
                            <CardHeader className=" shrink-0 pb-2 flex justify-between items-center">
                                <span className="font-semibold text-md text-lg">Kelompok 1</span>
                                <span>(3/3 Anggota)</span>
                            </CardHeader>
                            <CardContent className="flex-1 min-h-0 h-auto flex flex-col gap-2 w-full h-full">
                                <div className="shrink-0 bg-[#F9FAFB] border border-[#F3F4F6] rounded-lg px-3 py-2">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold capitalize">Kumara Ivan Anuraga</span>
                                        <span className="text-xs font-regular text-[#9CA3AF] ">Ketua Kelompok</span>
                                    </div>
                                </div>
                                <div className="bg-[#F9FAFB] border border-[#F3F4F6] rounded-lg px-3 py-2">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold capitalize">Kumara Ivan Anuraga</span>
                                        <span className="text-xs font-regular text-[#9CA3AF] ">Ketua Kelompok</span>
                                    </div>
                                </div>
                                <div className="bg-[#F9FAFB] border border-[#F3F4F6] rounded-lg px-3 py-2">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold capitalize">Kumara Ivan Anuraga</span>
                                        <span className="text-xs font-regular text-[#9CA3AF] ">Ketua Kelompok</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="mt-auto shrink-0 flex justify-between items-center w-full border-t border-[#F3F4F6]">
                                <span className="text-[#9CA3AF] text-sm">Status kuota penuh</span>
                                <span className={`font-semibold text-sm`}>Lengkap</span>
                            </CardFooter>
                        </Card>
                    </CardContent>
                </Card>
            </section>
        </main>
    )
}
