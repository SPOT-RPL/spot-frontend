import Card from "@/components/card/Card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowRight, Check, Filter, User, UserPlus } from "lucide-react";

export default function ManajamenTubes() {
  const MataKuliahData = [
    {
      status: "terjadwal",
      mataKuliah: "Rekayasa Perangkat Lunak",
      dosen: "Prof. Dr. Veronica Sri Moertini, Ir., M.T.",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae exercitationem quae voluptates hic sunt sit libero eaque nisi eos minima.",
      directTo: "",
    },
    {
      status: "pendaftaran",
      mataKuliah: "Artificial Intelligence",
      dosen: "Lionov, Ph.D.",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae exercitationem quae voluptates hic sunt sit libero eaque nisi eos minima.",
      directTo: "",
    },
    {
      status: "selesai",
      mataKuliah: "Keamanan Informasi",
      dosen: "Mariskha Tri Adithia, S.Si., M.Sc., PDEng",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae exercitationem quae voluptates hic sunt sit libero eaque nisi eos minima.",
      directTo: "",
    },
  ];

  const statusBadgeMapping = {
    terjadwal: {
      badge: "blue",
      dotColor: "bg-blue-800",
    },
    pendaftaran: {
      badge: "yellow",
      dotColor: "bg-yellow-800",
    },
    selesai: {
      badge: "green",
      dotColor: "bg-green-800",
    },
    bata: {
      badge: "red",
      dotColor: "bg-red-800",
    },
  };

  return (
    <div className="px-8 py-12 w-full flex-col gap-6">
      <header className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold">Manajemen Tugas Besar</h1>
          <p className="font-semibold text-sm text-gray-400">
            Pantau seluruh tugas besar yang dijadwalkan untukmu.
          </p>
        </div>
        <div className="flex items-center w-[365px] gap-2">
          <Input
            className="border border-[#E2E8F0] rounded-lg h-9 w-72"
            placeholder="Cari Mata Kuliah"
          />
          <Popover>
            <PopoverTrigger
              render={
                <Button variant="secondary">
                  <span className="flex items-center text-[#1e1e1e] gap-2 font-bold">
                    <Filter /> Filter
                  </span>
                </Button>
              }
            />
            <PopoverContent align="end">
              <PopoverHeader className="flex flex-row justify-between items-center">
                <div>
                  <PopoverTitle>Filter Status</PopoverTitle>
                  <PopoverDescription>
                    Pilih Status Tugas Besar
                  </PopoverDescription>
                </div>
                <Button
                  variant="ghost"
                  className="font-bold text-xs text-[#4D77D7] uppercase tracking-widest"
                >
                  RESET
                </Button>
              </PopoverHeader>
              <div className="w-full bg-gray-200 h-px rounded-sm my-1"></div>
              <div className="flex w-full gap-0.5 flex-col">
                <Button
                  variant="ghost"
                  className="bg-gray-200/50 w-full flex px-2.5 py-2 justify-between"
                >
                  <div className="flex flex-row items-center gap-2">
                    <div className="w-2 h-2 rounded-sm bg-gray-400"></div>
                    <div className="font-semibold text-xs text-gray-900">
                      Semua Status
                    </div>
                  </div>
                  <div>
                    <Check size={16} color="#2563EB" />
                  </div>
                </Button>
                <Button
                  variant="ghost"
                  className="bg-gray-200/20 hover:bg-gray-300/30 w-full flex px-2.5 py-2 justify-between"
                >
                  <div className="flex flex-row items-center gap-2">
                    <div className="w-2 h-2 rounded-sm bg-yellow-400"></div>
                    <div className="font-semibold text-xs text-gray-700">
                      Pendaftaran
                    </div>
                  </div>
                  <div className="pr-1 text-gray-400">1</div>
                </Button>
                <Button
                  variant="ghost"
                  className="bg-gray-200/20 hover:bg-gray-300/30 w-full flex px-2.5 py-2 justify-between"
                >
                  <div className="flex flex-row items-center gap-2">
                    <div className="w-2 h-2 rounded-sm bg-blue-400"></div>
                    <div className="font-semibold text-xs text-gray-700">
                      Terjadwal
                    </div>
                  </div>
                  <div className="pr-1 text-gray-400">3</div>
                </Button>
                <Button
                  variant="ghost"
                  className="bg-gray-200/20 hover:bg-gray-300/30 w-full flex px-2.5 py-2 justify-between"
                >
                  <div className="flex flex-row items-center gap-2">
                    <div className="w-2 h-2 rounded-sm bg-green-400"></div>
                    <div className="font-semibold text-xs text-gray-700">
                      Selesai
                    </div>
                  </div>
                  <div className="pr-1 text-gray-400">2</div>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </header>
      <section className="grid grid-cols-3 gap-x-5 gap-y-5 my-5">
        {MataKuliahData.map((matkul, idx) => (
          <Card variant="outline" className="h-80 p-6" key={idx}>
            <Card.Header className="justify-end">
              <Badge
                variant={statusBadgeMapping[matkul.status].badge || "default"}
                className="text-xs font-semibold gap-1.25 capitalize"
              >
                <div
                  className={`w-1.25 h-1.25 rounded-xl ${statusBadgeMapping[matkul.status].dotColor}`}
                ></div>
                {matkul.status}
              </Badge>
            </Card.Header>
            <Card.Content>
              <div className="flex flex-col gap-4">
                <div className="text-2xl font-extrabold text-[#1E293B] uppercase">
                  {matkul.mataKuliah}
                </div>
                <div className="text-xs font-semibold text-[#757575] flex items-center gap-1.5">
                  <User size={20} /> {matkul.dosen}
                </div>
                <div className="flex text-[10px] font-medium text-[#757575] tracking-widest">
                  {matkul.description}
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 h-px rounded-sm my-1"></div>
                {matkul.status === "pendaftaran" ? (
                  <Button
                    variant="primary"
                    className="flex items-center w-full p-0 gap-2"
                  >
                    <UserPlus size={16} color="#E2E8F0" />
                    <div className="font-semibold text-xs text-[#E2E8F0]">
                      Daftar Kelompok
                    </div>
                  </Button>
                ): (
                  <Button
                    variant="ghost"
                    className="flex items-center justify-between w-full p-0"
                  >
                    <div className="font-semibold text-xs text-[#757575]">
                      Lihat Detail
                    </div>
                    <ArrowRight size={16} color="#757575" />
                  </Button>
                )}
              </div>
            </Card.Content>
          </Card>
        ))}
      </section>
    </div>
  );
}
