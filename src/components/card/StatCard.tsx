 import type {CardDetails} from "@/types/CardStat.types.ts";
 import {ArrowRight} from "lucide-react";
 import {Link} from "react-router";
export function StatCard({item}: {item: CardDetails}) {
    const Icon=item.icon;
    return (
        <div className="rounded-2xl bg-[#F0F2F5] p-2.5 border border-gray-200 shadow-xs flex flex-col justify-between">
            <div className="flex flex-col items-center p-5 rounded-2xl gap-4 bg-white">
            {/*    card title*/}
                <div className="flex items-center justify-between w-full">
                    <span className="text-[#545454] text-md font-semibold">{item.title}</span>
                    <div className="w-9 h-9 bg-[#D9D9D9] flex items-center justify-center rounded-lg"><Icon className="w-5 h-5 text-[#728195]"/></div>
                </div>
            {/*    card stat*/}
                <div className="flex flex-col w-full">
                    <span className="text-2xl font-bold tracking-light text-[#1E1E1E]">{item.statistic}</span>
                    <span className="text-sm font-medium tracking-light text-[#757575]">{item.unit}</span>
                </div>
            </div>
        {/*    footer card*/}
            <div className="py-4 px-3">
                {item.path ? (
                    <Link
                        to={item.path}
                        className="flex items-center justify-between text-xs font-semibold text-gray-500 hover:text-blue-600 transition"
                    >
                        <span>Lihat lebih lengkap</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                ) : (
                    <div className="flex items-center justify-between text-xs font-semibold text-gray-400">
                        <span>Lihat lebih lengkap</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                )}
            </div>
        </div>
    )
}