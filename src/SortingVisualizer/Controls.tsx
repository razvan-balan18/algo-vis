import { useSortStore } from "@/store/sortVisualizerStore";
import { SORT_ALGORITHM_LIST } from "@/types/sortIndex";

export const Controls = () => {
    const selectedAlgorithm = useSortStore(s => s.selectedAlgorithm)
    const status = useSortStore(s => s.status)
    const arraySize = useSortStore(s => s.arraySize)
    const speed = useSortStore(s => s.speed)

    const setAlgorithm = useSortStore(s => s.setAlgorithm)
    const runSort = useSortStore(s => s.runSort)
    const generateArray = useSortStore(s => s.generateArray)
    const setArraySize = useSortStore(s => s.setArraySize)
    const setSpeed = useSortStore(s => s.setSpeed)

    const isRunning = status === 'running'

    return (
        <div className="flex flex-wrap items-center justify-center gap-3">
            <select
                value={selectedAlgorithm}
                onChange={(e) => setAlgorithm(e.target.value as typeof selectedAlgorithm)}
                disabled={isRunning}
                className="rounded border border-slate-300 px-2 py-1"
            >
                {SORT_ALGORITHM_LIST.map((algo) => (
                    <option key={algo.id} value={algo.id}>
                        {algo.name}
                    </option>
                ))}
            </select>

            <button
                onClick={runSort}
                disabled={isRunning}
                className="rounded bg-green-600 px-3 py-1 text-white disabled:opacity-50"
            >
                {isRunning ? 'Running…' : 'Run'}
            </button>

            <button
                onClick={generateArray}
                disabled={isRunning}
                className="rounded bg-slate-200 px-3 py-1 disabled:opacity-50"
            >
                New Array
            </button>

            <label className="flex items-center gap-2 text-sm">
                Size
                <input
                    type="range"
                    min={10}
                    max={100}
                    value={arraySize}
                    onChange={(e) => setArraySize(Number(e.target.value))}
                    disabled={isRunning}
                />
            </label>

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
