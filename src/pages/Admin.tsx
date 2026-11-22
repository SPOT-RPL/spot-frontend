import { Plus } from "lucide-react";
import {StatCard} from "@/components/card/StatCard.tsx";
import {useMemo} from "react";
import {getCard} from "@/config/cardStat.config.ts";
export default function Admin() {
    const role="Admin";
    const cardConfig=useMemo(()=> getCard(role), [role]);
  return (
    <main className="px-8 py-12 w-full flex flex-col gap-8">
      <header className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="font-medium text-sm text-gray-400">
            Pantau sistem dan   masukkan data jadwal
          </p>
        </div>
        <button className="flex gap-3 items-center bg-[#F4D35E] font-bold text-sm px-3 py-2 rounded-xl">
          <Plus className="h-4 w-4" />
          <span >Import Data</span>
        </button>
      </header>
      <div className="w-full flex-1 min-h-0 overflow-hidden grid grid-cols-4 gap-6">
          {cardConfig.cards.map((card, index)=> (
              <StatCard key={index} item={card} />
          ))}
        {/*<Kalender/>*/}
      </div>
    </main>
  );
}
