import { CELL_COLORS, type Cell } from "@/types/pathIndex";
import { memo } from "react";

interface CellBoardProps {
    cell: Cell
    onDown: (cell: Cell) => void
    onEnter: (cell: Cell) => void
}

export const CellBoard = memo(({ cell, onDown, onEnter }: CellBoardProps) => {

    return (
        <div
            onMouseDown={() => onDown(cell)}
            onMouseEnter={() => onEnter(cell)}
            className={`h-[22px] w-[22px] border border-slate-200 ${CELL_COLORS[cell.type]}`}
        />
    )

});
