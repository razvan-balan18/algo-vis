import { useVisualizerStore } from "@/store/visualizer";

export const Stats = () => {
    const stats = useVisualizerStore(s => s.stats)

    if (!stats) return null
    return (
        <div className="flex gap-4 text-sm">
            <span>Visited {stats.visitedCount} cells</span>
            <span>Path: {stats.pathLength} cells</span>
            <span>Time: {stats.executionMs.toFixed(2)} ms</span>
        </div>
    )
};
