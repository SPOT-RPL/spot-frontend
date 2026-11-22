import type {CardConfig} from "@/types/CardStat.types.ts";
import {useMemo} from "react";
import {getCard} from "@/config/cardStat.config.ts";
import {StatCard} from "@/components/card/StatCard.tsx";

export default function Mahasiswa() {
    const role="Mahasiswa"
    const cardConfig: CardConfig = useMemo(()=> getCard(role), [role]);
    return(
        <div className="flex flex-col p-8 gap-8">
            <header className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold tracking-wide capitalize">Welcome back, Kumara Ivan!</h1>
                <p className="text-[#94A3B8] font-medium text-sm">Jangan lupa perhatikan jadwalmu minggu ini!</p>
            </header>
            <div className="grid grid-cols-4 gap-6">
                {cardConfig.cards.map((card, index)=> (
                    <StatCard key={index} item={card} />
                ))}
            </div>
        </div>
    )
}