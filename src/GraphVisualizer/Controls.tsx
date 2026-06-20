import { useVisualizerStore } from "@/store/pathVisualizerStore";
import { ALGORITHM_LIST } from "@/types/pathIndex";

export const Controls = () => {
    const selectedAlgorithm = useVisualizerStore(s => s.selectedAlgorithm)
    const status = useVisualizerStore(s => s.status)
    const speed = useVisualizerStore(s => s.speed)

    const setAlgorithm = useVisualizerStore(s => s.setAlgorithm)
    const runAlgorithm = useVisualizerStore(s => s.runAlgorithm)
    const clearPath = useVisualizerStore(s => s.clearPath)
    const clearGrid = useVisualizerStore(s => s.clearGrid)
    const setSpeed = useVisualizerStore(s => s.setSpeed)

    const isRunning = status === 'running'

    return (
        <div className="flex items-center gap-3">
            <select
                value={selectedAlgorithm}
                onChange={(e) => setAlgorithm(e.target.value as typeof selectedAlgorithm)}
                disabled={isRunning}
                className="rounded border border-slate-300 px-2 py-1"
            >
                {ALGORITHM_LIST.map((algo) => (
                    <option key={algo.id} value={algo.id}>
                        {algo.name}
                    </option>
                ))}
            </select>

            <button
                onClick={runAlgorithm}
                disabled={isRunning}
                className="rounded bg-green-600 px-3 py-1 text-white disabled:opacity-50"
            >
                {isRunning ? 'Running…' : 'Run'}
            </button>

            <button
                onClick={clearPath}
                disabled={isRunning}
                className="rounded bg-slate-200 px-3 py-1 disabled:opacity-50"
            >
                Clear Path
            </button>

            <button
                onClick={clearGrid}
                disabled={isRunning}
                className="rounded bg-slate-200 px-3 py-1 disabled:opacity-50"
            >
                Clear Walls
            </button>

            <select
                value={speed}
                onChange={(e) => setSpeed(e.target.value as typeof speed)}
                className="rounded border border-slate-300 px-2 py-1"
            >
                <option value="fast">Fast</option>
                <option value="normal">Normal</option>
                <option value="slow">Slow</option>
            </select>
        </div>
    )
}
