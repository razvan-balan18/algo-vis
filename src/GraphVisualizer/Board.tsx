import { useVisualizerStore } from "@/store/visualizer";
import type { Cell } from '@/types'
import { useEffect, useCallback } from "react";
import { CellBoard } from "./CellBoard";

export function Board() {
    const grid = useVisualizerStore(s => s.grid)

    const setCell = useVisualizerStore(s => s.setCell)
    const setStartNode = useVisualizerStore(s => s.setStartNode)
    const setEndNode = useVisualizerStore(s => s.setEndNode)
    const setDragMode = useVisualizerStore(s => s.setDragMode)
    const setMouseDown = useVisualizerStore(s => s.setMouseDown)

    useEffect(() => {
        const up = () => {
            setMouseDown(false)
            setDragMode(null)
        }
        window.addEventListener('mouseup', up)
        return () => window.removeEventListener('mouseup', up)
    }, [setMouseDown, setDragMode])

    const handleDown = useCallback((cell: Cell) => {
        setMouseDown(true)

        if (cell.type === 'start') { setDragMode('move-start'); return }
        if (cell.type === 'end') { setDragMode('move-end'); return }

        const mode = cell.type === 'wall' ? 'erase' : 'wall'
        setDragMode(mode)
        setCell(cell.row, cell.col, mode === 'wall' ? 'wall' : 'empty')
    }, [setMouseDown, setDragMode, setCell])

    const handleEnter = useCallback((cell: Cell) => {
        const { isMouseDown, dragMode } = useVisualizerStore.getState()
        if (!isMouseDown) return

        switch (dragMode) {
            case 'wall': setCell(cell.row, cell.col, 'wall'); break
            case 'erase': setCell(cell.row, cell.col, 'empty'); break
            case 'move-start': setStartNode({ row: cell.row, col: cell.col }); break
            case 'move-end': setEndNode({ row: cell.row, col: cell.col }); break
        }
    }, [setCell, setStartNode, setEndNode])

    return (
        <div
            className="grid w-fit border border-slate-300 select-none"
            style={{ gridTemplateColumns: `repeat(${grid[0]?.length ?? 0}, 22px)` }}
        >
            {grid.map((row) =>
                row.map((cell) => (
                    <CellBoard
                        key={`${cell.row}-${cell.col}`}
                        cell={cell}
                        onDown={handleDown}
                        onEnter={handleEnter}
                    />
                ))
            )}
        </div>
    )
}
