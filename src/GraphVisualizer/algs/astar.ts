import type { AlgorithmResult, AlgorithmStep, Cell, Coordinate } from "@/types";
import { MinHeap } from "./heap";

export function astar(grid: Cell[][], start: Coordinate, end: Coordinate): AlgorithmResult {
    const rows = grid.length;
    const cols = grid[0]?.length ?? 0;

    const key = (r: number, c: number) => `${r},${c}`;

    const heuristic = (r: number, c: number) => Math.abs(r - end.row) + Math.abs(c - end.col);

    const dist = new Map<string, number>([[key(start.row, start.col), 0]]);
    const parents = new Map<string, Coordinate>();
    const visited = new Set<string>();
    const frontier = new MinHeap<Coordinate>();
    frontier.push({ row: start.row, col: start.col }, heuristic(start.row, start.col));

    const steps: AlgorithmStep[] = [];
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

    let found = false;

    while (frontier.size > 0) {
        const current = frontier.pop()!;
        const { row, col } = current;
        const k = key(row, col);

        if (visited.has(k)) continue;
        visited.add(k);

        if (row === end.row && col === end.col) {
            found = true;
            break;
        }

        if (!(row === start.row && col === start.col)) {
            steps.push({ type: 'visit', cells: [{ row, col }] });
        }

        const currentDist = dist.get(k)!;

        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;

            if (
                newRow >= 0 && newRow < rows &&
                newCol >= 0 && newCol < cols &&
                grid[newRow]![newCol]!.type !== 'wall'
            ) {
                const nk = key(newRow, newCol);
                if (visited.has(nk)) continue;

                const newDist = currentDist + grid[newRow]![newCol]!.weight;

                if (newDist < (dist.get(nk) ?? Infinity)) {
                    dist.set(nk, newDist);
                    parents.set(nk, { row, col });
                    frontier.push({ row: newRow, col: newCol }, newDist + heuristic(newRow, newCol));
                }
            }
        }
    }

    const path: Coordinate[] = [];
    if (found) {
        let step: Coordinate | undefined = { row: end.row, col: end.col };
        while (step) {
            path.unshift(step);
            step = parents.get(key(step.row, step.col));
        }
    }

    const pathSteps: AlgorithmStep[] = path
        .filter(
            (c) =>
                !(c.row === start.row && c.col === start.col) &&
                !(c.row === end.row && c.col === end.col)
        )
        .map((c) => ({ type: 'path', cells: [c] }));

    return {
        steps: [...steps, ...pathSteps],
        path,
        found,
        visitedCount: visited.size,
        pathLength: path.length,
    };
}
