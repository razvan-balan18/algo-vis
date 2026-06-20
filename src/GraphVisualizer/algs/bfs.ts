import type { AlgorithmResult, AlgorithmStep, Cell, Coordinate } from "@/types/pathIndex";

export function bfs(grid: Cell[][], start: Coordinate, end: Coordinate): AlgorithmResult {
    const rows = grid.length;
    const cols = grid[0]?.length ?? 0;

    const key = (r: number, c: number) => `${r},${c}`;

    const visited = new Set<string>([key(start.row, start.col)]);
    const parents = new Map<string, Coordinate>();
    const queue: Coordinate[] = [{ row: start.row, col: start.col }];

    const steps: AlgorithmStep[] = [];
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

    let found = false;

    while (queue.length > 0) {
        const current = queue.shift()!;
        const { row, col } = current;

        if (row === end.row && col === end.col) {
            found = true;
            break;
        }

        if (!(row === start.row && col === start.col)) {
            steps.push({ type: 'visit', cells: [{ row, col }] });
        }

        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;

            if (
                newRow >= 0 && newRow < rows &&
                newCol >= 0 && newCol < cols &&
                grid[newRow]![newCol]!.type !== 'wall' &&
                !visited.has(key(newRow, newCol))
            ) {
                visited.add(key(newRow, newCol));
                parents.set(key(newRow, newCol), { row, col });
                queue.push({ row: newRow, col: newCol });
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
