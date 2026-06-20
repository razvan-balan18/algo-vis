import { useSortStore } from "@/store/sortVisualizerStore";

export const Stats = () => {
    const stats = useSortStore(s => s.stats)

    if (!stats) return null
    return (
        <div className="flex gap-4 text-sm">
            <span>Comparisons: {stats.comparisons}</span>
            <span>Swaps: {stats.swaps}</span>
            <span>Time: {stats.executionMs.toFixed(2)} ms</span>
        </div>
    )
};
