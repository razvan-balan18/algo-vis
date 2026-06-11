import { useVisualizerStore } from "@/store/visualizer";

export function Board() {
    const grid = useVisualizerStore(s => s.grid)

    return (
        <div
            className="grid w-fit border border-slate-300"
            style={{ gridTemplateColumns: `repeat(${grid[0]?.length ?? 0}, 22px)` }}
        >
            {grid.map((row) =>
                row.map((cell) => (
                    <div
                        key={`${cell.row}-${cell.col}`}
                        className="h-[22px] w-[22px] border border-slate-200 hover:bg-slate-100"
                    />
                ))
            )}
        </div>
    )
};
