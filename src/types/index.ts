export interface Coordinate {
    row: number;
    col: number;
}

export type CellType = | 'empty' | 'wall' | 'start' | 'end' | 'visited' | 'path' | 'weight'

export interface Cell {
    row: number
    col: number
    type: CellType
    weight: number
    isAnimating: boolean
}

export type AlgorithmId = | 'dijkstra' | 'astar' | 'bfs' | 'dfs'

export interface AlgorithmInfo {
    id: AlgorithmId
    name: string
    description: string
    weighted: boolean
}

export const ALGORITHM_LIST: AlgorithmInfo[] = [
    {
        id: 'dijkstra',
        name: 'Dijkstra',
        description: 'algorithm for shortes path in weighted graphs',
        weighted: true
    },
    {
        id: 'astar',
        name: 'A*',
        description: 'algorithm for navigate shortes path with heuristics',
        weighted: true
    },
    {
        id: 'bfs',
        name: 'BFS',
        description: 'algorithm for shortes path in unweighted graphs',
        weighted: false
    },
    {
        id: 'dfs',
        name: 'DFS',
        description: 'doesnt guarantee shortest path, depth search',
        weighted: false
    }
]

export interface AlgorithmStep {
    type: 'visit' | 'path'
    cells: Coordinate[]
}

export interface AlgorithmResult {
    steps: AlgorithmStep[]
    path: Coordinate[]
    found: boolean
    visitedCount: number
    pathLength: number
}

export type Status = 'idle' | 'running' | 'paused' | 'done'

export interface GridSetup {
    rows: number
    cols: number
}

export type DragMode = 'wall' | 'erase' | 'move-start' | 'move-end' | 'weight' | null
export type SpeedLevel = 'fast' | 'normal' | 'slow'

export const SPEED_MAP: Record<SpeedLevel, number> = {
    fast: 10,
    normal: 30, 
    slow: 80,
}