import type {CardConfig} from "@/types/CardStat.types.ts";
import {useMemo} from "react";
import {getCard} from "@/config/cardStat.config.ts";
import {StatCard} from "@/components/card/StatCard.tsx";

export default function Dosen() {
    const role="Dosen";
    const cardConfig: CardConfig =useMemo(()=> getCard(role), [role])
    return(
        <div className="flex flex-col gap-8 p-8">
            <header>
                <h1 className="text-xl font-bold tracking-wide capitalize">welcome back Mr. Bagoes!</h1>
            </header>
            <div className="grid grid-cols-3 gap-6">
                {cardConfig.cards.map((card, index)=> (
                    <StatCard key={index} item={card}/>
                ))}
            </div>
        </div>
    )
}