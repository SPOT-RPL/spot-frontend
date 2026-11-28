import Card, {CardContent, CardHeader} from "@/components/ui/Card.tsx";
import {Funnel, Search} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Field, FieldLabel} from "@/components/ui/field.tsx";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination.tsx";
import {useEffect, useState} from "react";
interface mataKuliahResponse{
    nama_mk:string;
    kelas:{
        nama_kelas:string;
    }[];
}
interface mataKuliahItem{
    title:string;
    classes:string[];
}
async function fetchMataKuliah(token:string){
    const res=await fetch(`/api/mahasiswa/courses`, { headers: {
            Authorization: `Bearer ${token}`,
        },});
    if(!res.ok){
        throw new Error(`gagal memuat mata kuliah ${res.status}`);
    }
    const dataMatkul:mataKuliahResponse[]=await res.json();
    return dataMatkul.map((item)=>({
        title:item.nama_mk,
        classes:item.kelas.map((k)=>k.nama_kelas),
    }));
}
async function saveMataKuliah(npm:string, courses:{nama_mk:string, kelas:string}[]){
    const res = await fetch(`/api/mahasiswa/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ npm, courses }),
    });
    if (!res.ok) {
        throw new Error(`Gagal menyimpan mata kuliah (${res.status})`);
    }
    return res.json();
}
export default function MataKuliah() {
    const accessToken="eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiNWJhZDMxNzUtYjk3MS00ZTE2LTgyODEtYjQ4MWI1ZmU2OGQyIiwiaWF0IjoxNzk1Nzg5MTU5LCJpc3MiOiJzcG90LWJhY2tlbmQiLCJhdWQiOiJzcG90LWZyb250ZW5kIiwiZXhwIjoxNzk1NzkwMDU5fQ.TiGE-xhLWmHwKO7oupDJLD-zdAwYLscl6wMx9kEcT58"
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [mataKuliah, setMataKuliah]=useState<mataKuliahItem[]>([]);
    const [selectedClasses, setSelectedClasses] = useState<Record<string, string>>({});
    useEffect(() => {
        if (!accessToken) return;

        fetchMataKuliah(accessToken)
            .then(setMataKuliah)
            .catch(console.error);
    }, [accessToken]);

    const totalMatkul=mataKuliah.length;
    const totalPages=Math.max(1, Math.ceil(totalMatkul/pageSize));
    const paginatedMatkul=mataKuliah.slice((currentPage-1)*pageSize,currentPage*pageSize);
    return(
        <main className="flex flex-col p-8 gap-8">
            <header className="flex flex-col gap-1">
                <h1 className="font-bold text-2xl tracking-wide">Mata Kuliah</h1>
                <p className="text-sm font-medium text-[#94A3B8]">Lihat dan tambahkan mata kuliahmu semester ini</p>
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
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedMatkul.map((item, index) => {
                                    const selectedClass = selectedClasses[item.title] ?? "";
                                    return(
                                        <TableRow key={index}>
                                            <TableCell>{item.title}</TableCell>
                                            <TableCell>
                                                <Select value={selectedClass} onValueChange={(value)=>{
                                                    if(value) {
                                                        setSelectedClasses((prev)=>({...prev, [item.title]:value}))
                                                    }
                                                }}>
                                                    <SelectTrigger className="w-20 mx-auto">
                                                        <SelectValue/>
                                                    </SelectTrigger>
                                                    <SelectContent align="start">
                                                        {item.classes.map((kelas)=>(
                                                            <SelectItem key={kelas} value={kelas}>{kelas}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>
                                            <TableCell>
                                                <input
                                                    type="checkbox"
                                                    disabled={!selectedClass}
                                                    className="size-4 accent-[#3B82F6] cursor-pointer disabled:cursor-not-allowed"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>

                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-2">
                                <Field orientation="horizontal"  className="w-fill">
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
                                    <span className="text-[#475569] font-medium text-sm whitespace-nowrap">dari {totalMatkul} data</span>
                                </Field>
                            </div>
                            <Pagination className="w-fit mx-0">
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious href="#" onClick={(e)=>{e.preventDefault(); setCurrentPage((p)=>Math.max(1,p-1))}} className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}/>
                                    </PaginationItem>
                                    {Array.from({length:totalPages}, (_, i)=>i+1).map((page)=>(
                                        <PaginationItem key={page}><PaginationLink href="#" isActive={page===currentPage} onClick={(e)=>{e.preventDefault(); setCurrentPage(page)}} className="cursor-pointer">{page}</PaginationLink></PaginationItem>
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