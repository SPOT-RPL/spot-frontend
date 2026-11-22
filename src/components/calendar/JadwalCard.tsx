import type { CardJadwal } from "@/types/cardJadwal.types.ts";
export function jadwalCard({data}: {data: CardJadwal}) {
    return(
        <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-xs flex flex-col gap-1.5 hover:shadow-md transition">
            <h3>{data.title}</h3>
            <p>{data.participant}</p>
            <span>{data.startTime} - {data.endTime}</span>
            <span>{data.room}</span>
        </div>
    )

}