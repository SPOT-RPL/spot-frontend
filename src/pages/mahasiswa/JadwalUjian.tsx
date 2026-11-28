import Card, {CardContent, CardHeader} from "@/components/ui/Card.tsx";
import {Funnel, Search} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {Table, TableBody, TableHead, TableCell, TableRow, TableHeader} from "@/components/ui/table.tsx";
import {
    Pagination,
    PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import { useEffect, useState} from "react";
import {Field, FieldLabel} from "@/components/ui/field.tsx";

interface jadwalUjianResponse {
    jam_mulai:string,
    jam_selesai:string,
    tanggal:string,
    ruangan:{
        nama_ruangan:string,
    }
    matakuliah:{
        nama_mk:string,
        kelas:{
            nama_kelas:string;
        }[];
    }
}
interface jadwalUjianItem {
    title: string;
    class: string;
    date: string;
    startTime: string;
    endTime: string;
    room: string;
}
function formatTime(isoString: string):string{
    const date = new Date(isoString);
    const hours = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minute}`;
}
function formatDate(isoString: string):string{
    return new Date(isoString).toLocaleDateString("id-ID", {
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}
async function fetchJadwalUjian(token:string):Promise<jadwalUjianItem[]> {
    const res=await fetch(
        `/api/mahasiswa/exam-schedules`, {headers: {
            Authorization: `Bearer ${token}`
            }})
    if(!res.ok){
        throw new Error(`gagal memuat jadwal ujian ${res.status}` )
    }
    const dataUjian:jadwalUjianResponse[]= await res.json();
    return dataUjian.map((item)=>({
        title:item.matakuliah.nama_mk,
        class:item.matakuliah.kelas[0]?.nama_kelas??"-",
        date:formatDate(item.tanggal),
        startTime:formatTime(item.jam_mulai),
        endTime:formatTime(item.jam_selesai),
        room:item.ruangan.nama_ruangan
    }))
}
export default function JadwalUjian() {
    const token=""
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [jadwal, setJadwal]=useState<jadwalUjianItem[]>([]);
    const totalSchedule=jadwal.length;
    const totalPages=Math.max(1, Math.ceil(totalSchedule/pageSize));
    const paginatedJadwal=jadwal.slice((currentPage-1)*pageSize,currentPage*pageSize);
    useEffect(()=>{
        fetchJadwalUjian(token).then(setJadwal).catch(console.error);
    },[token]);
    return (
        <main className="flex flex-col gap-6 p-8">
            <header className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold tracking-wide">Jadwal Ujian</h1>
                <p className="text-sm font-medium text-[#94A3B8]">Lihat jadwal ujianmu di semester ini</p>
            </header>
            <div>
                <Card variant={"default"}>
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
                    <CardContent className="flex flex-col gap-8">
                        <Table>
                            <TableHeader>
                                <TableRow className="text-[15px] text-[#64748B] font-semibold">
                                    <TableHead>Mata Kuliah</TableHead>
                                    <TableHead>Kelas</TableHead>
                                    <TableHead>Hari, Tanggal</TableHead>
                                    <TableHead>Jam</TableHead>
                                    <TableHead>Lokasi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedJadwal.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.title}</TableCell>
                                        <TableCell>{item.class}</TableCell>
                                        <TableCell>{item.date}</TableCell>
                                        <TableCell>{item.startTime}-{item.endTime}</TableCell>
                                        <TableCell>{item.room}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-2">
                                <Field orientation="horizontal"  className="w-fit">
                                    <FieldLabel htmlFor="totalRow">Tampilkan</FieldLabel>
                                        <Select value={String(pageSize)} onValueChange={(value)=>{
                                            if(value) {
                                                setPageSize(Number(value));
                                                setCurrentPage(1);
                                            }
                                        }}>
                                            <SelectTrigger  className="w-20" id="totalRow">
                                                <SelectValue/>
                                            </SelectTrigger>
                                            <SelectContent align="start">
                                                <SelectGroup>
                                                    <SelectItem value="10">10</SelectItem>
                                                    <SelectItem value="15">15</SelectItem>
                                                    <SelectItem value="20">20</SelectItem>
                                                    <SelectItem value="25">25</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    <span className="text-[#475569] font-medium text-sm whitespace-nowrap">dari {totalSchedule} data</span>
                                </Field>
                            </div>
                            <Pagination className="w-fit mx-0">
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious href="#" onClick={(e)=>{e.preventDefault(); setCurrentPage((p)=>Math.max(1,p-1))}} className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}/>
                                    </PaginationItem>
                                    {Array.from({length:totalPages}, (_, i)=>i+1).map((page)=>(
                                        <PaginationItem><PaginationLink href="#" isActive={page===currentPage} onClick={(e)=>{e.preventDefault(); setCurrentPage(page)}} className="cursor-pointer">{page}</PaginationLink></PaginationItem>
                                    ))}
                                    <PaginationItem><PaginationNext href="#" onClick={(e)=>{e.preventDefault(); setCurrentPage((p)=>Math.min(totalPages, p+1))}} className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}/></PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}