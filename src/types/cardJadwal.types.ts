export type hariKuliah="Senin"|"Selasa"|"Rabu"|"Kamis"|"Jumat";
export interface CardJadwal {
    title: string;
    participant: string;
    startTime:String;
    endTime:String;
    day:hariKuliah;
    room?: string;
}
