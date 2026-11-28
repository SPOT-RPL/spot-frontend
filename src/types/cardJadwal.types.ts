export type hariKuliah="Senin"|"Selasa"|"Rabu"|"Kamis"|"Jumat";
export interface CardJadwal {
    title: string;
    participant: string;
    startTime:string;
    endTime:string;
    day:hariKuliah;
    room?: string;
}
