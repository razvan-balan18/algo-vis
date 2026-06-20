import { useSortStore } from "@/store/sortVisualizerStore";
import { BAR_COLORS } from "@/types/sortIndex";

export function Bars() {
    const array = useSortStore(s => s.array)
    const highlights = useSortStore(s => s.highlights)
    const highlightType = useSortStore(s => s.highlightType)
    const status = useSortStore(s => s.status)

    const colorFor = (index: number) => {
        if (status === 'done') return BAR_COLORS.sorted
        if (highlights.includes(index)) {
            return highlightType === 'compare' ? BAR_COLORS.compare : BAR_COLORS.active
        }
        return BAR_COLORS.default
    }

    return (
        <div className="flex h-96 w-full max-w-4xl items-end justify-center gap-[2px] rounded border border-slate-300 bg-white p-4">
            {array.map((value, index) => (
                <div
                    key={index}
                    className={`flex-1 rounded-t-sm transition-colors ${colorFor(index)}`}
                    style={{ height: `${value}%` }}
                />
            ))}
        </div>
    )
}
