import Card from "@/components/card/Card";
import { AnimatedFileUpload } from "@/components/ui/animated-file-upload";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Check,
  CheckIcon,
  Download,
  File,
  FilePlus,
  FileText,
  Filter,
  PlusIcon,
  UserPlus,
} from "lucide-react";

export default function ManajemenMahasiswa() {
  return (
    <div className="px-8 py-12 w-full flex flex-col gap-6">
      <header className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold">Manajemen Akun Mahasiswa</h1>
          <p className="font-semibold text-sm text-gray-400">
            Konfigurasi dan pantau Akun Mahasiswa
          </p>
        </div>
        <Dialog>
          <form>
            <DialogTrigger
              render={
                <Button variant="third">
                  <PlusIcon size={4} /> Tambah Akun
                </Button>
              }
            />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Akun Mahasiswa</DialogTitle>
                <DialogDescription>
                  Tambahkan data mahasiswa baru ke SPOT, secara Manual atau
                  melalui Impor File CSV dan Excel.
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger
                    value="input_manual"
                    className="flex items-center gap-2.5 data-active:[&_svg]:text-[#4D77D7]"
                  >
                    <UserPlus />
                    Input Manual
                  </TabsTrigger>
                  <TabsTrigger
                    value="import_file"
                    className="flex items-center gap-2.5 data-active:[&_svg]:text-[#4D77D7]"
                  >
                    <FilePlus />
                    Import File
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="input_manual">
                  <FieldGroup className="mt-4">
                    <Field>
                      <Label className="text-[#334155] text-xs font-bold">
                        NAMA LENGKAP<span className="text-[#EF4444]">*</span>
                      </Label>
                      <Input
                        id="name-1"
                        name="name"
                        placeholder="Contoh: Kumara Ivan"
                        className="h-9"
                      />
                    </Field>
                    <Field>
                      <Label className="text-[#334155] text-xs font-bold">
                        NPM<span className="text-[#EF4444]">*</span>
                      </Label>
                      <Input
                        id="npm-1"
                        name="npm"
                        placeholder="Contoh: 6182401018"
                        className="h-9"
                      />
                    </Field>
                    <Field>
                      <Label className="text-[#334155] text-xs font-bold">
                        EMAIL MAHASISWA<span className="text-[#EF4444]">*</span>
                      </Label>
                      <Input
                        id="email-1"
                        name="email"
                        placeholder="Contoh: Kumara Ivan"
                        className="h-9"
                      />
                    </Field>
                  </FieldGroup>
                </TabsContent>
                <TabsContent value="import_file">
                  <div className="mt-4">
                    <AnimatedFileUpload
                      maxSize={10 * 1024 * 1024}
                      accept=".xlsx"
                      onFilesSelected={(files) =>
                        console.log("Selected:", files)
                      }
                      onUploadComplete={(file) =>
                        console.log("Uploaded:", file.name)
                      }
                    />
                    <div className="bg-[#94A3B8]/10 w-full h-12 mt-5 border border-[#E2E8F0] rounded-xl flex items-center px-4 justify-between">
                      <div className="flex items-center gap-1.5 font-medium text-xs text-[#6B7280]">
                        <FileText size={20} color="#379E71" /> Belum memiliki
                        template format Data SPOT?
                      </div>
                      <div className="flex items-end gap-1.5 font-semibold text-xs text-[#4D77D7]">
                        <Download size={16} color="#4D77D7" /> Template
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <DialogFooter className="mt-3.5">
                <DialogClose
                  render={
                    <Button variant="outline" className="text-[#475569]">
                      Cancel
                    </Button>
                  }
                />
                <Button
                  type="submit"
                  variant="primary"
                  className="flex items-center gap-1.5"
                >
                  <CheckIcon size={16} className="translate-y-0.5" />
                  Simpan Data
                </Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </header>
      <section className="flex min-h-0 overflow-hidden">
        <Card className="w-full">
          <Card.Header className="flex justify-between items-center">
            <Input
              className="bg-white/50 border border-[#E2E8F0] rounded-xl w-72 h-9"
              placeholder="Cari Mahasiswa"
            />
            {/*<Button variant="secondary">
              <span className="flex items-center text-[#1e1e1e] gap-2 font-bold">
                <Filter /> Filter
              </span>
            </Button>*/}
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
                      <div className="font-semibold text-xs text-gray-700">Pendaftaran</div>
                    </div>
                    <div className="pr-1 text-gray-400">
                      1
                    </div>
                  </Button>
                  <Button
                    variant="ghost"
                    className="bg-gray-200/20 hover:bg-gray-300/30 w-full flex px-2.5 py-2 justify-between"
                  >
                    <div className="flex flex-row items-center gap-2">
                      <div className="w-2 h-2 rounded-sm bg-blue-400"></div>
                      <div className="font-semibold text-xs text-gray-700">Terjadwal</div>
                    </div>
                    <div className="pr-1 text-gray-400">
                      3
                    </div>
                  </Button>
                  <Button
                    variant="ghost"
                    className="bg-gray-200/20 hover:bg-gray-300/30 w-full flex px-2.5 py-2 justify-between"
                  >
                    <div className="flex flex-row items-center gap-2">
                      <div className="w-2 h-2 rounded-sm bg-green-400"></div>
                      <div className="font-semibold text-xs text-gray-700">Selesai</div>
                    </div>
                    <div className="pr-1 text-gray-400">
                      2
                    </div>
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </Card.Header>
          <Card.Content>{/* TODO: table nunggu pros */}</Card.Content>
        </Card>
      </section>
    </div>
  );
}
