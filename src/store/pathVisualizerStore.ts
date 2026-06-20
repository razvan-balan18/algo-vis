import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type {
  Cell,
  Coordinate,
  AlgorithmId,
  AlgorithmResult,
  Status,
  SpeedLevel,
  DragMode,
  GridSetup,
} from '@/types/pathIndex'
import { SPEED_MAP } from '@/types/pathIndex'
import { bfs } from '@/GraphVisualizer/algs/bfs'
import { dfs } from '@/GraphVisualizer/algs/dfs'
import { dijkstra } from '@/GraphVisualizer/algs/dijkstra'
import { astar } from '@/GraphVisualizer/algs/astar'

type AlgorithmFn = (grid: Cell[][], start: Coordinate, end: Coordinate) => AlgorithmResult

const ALGORITHMS: Partial<Record<AlgorithmId, AlgorithmFn>> = {
  bfs,
  dfs,
  dijkstra,
  astar,
}

let runId = 0
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

function createGrid(rows: number, cols: number, start: Coordinate, end: Coordinate): Cell[][] {
  return Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => ({
      row: r,
      col: c,
      type:
        r === start.row && c === start.col ? ('start' as const) : r === end.row && c === end.col ? ('end' as const) : ('empty' as const),
      weight: 1,
      isAnimating: false,
    }))
  )
}

// default starting/ending locations
const DEFAULT_START: Coordinate = {
  row: 15,
  col: 10,
}

const DEFAULT_END: Coordinate = {
  row: 15,
  col: 30,
}

const DEFAULT_GRID_SETUP: GridSetup = {
  rows: 30,
  cols: 50,
}

// store type
interface VisualizerState {
  // grid setup
  grid: Cell[][]
  gridSetup: GridSetup
  startNode: Coordinate
  endNode: Coordinate

  // algorithm 
  selectedAlgorithm: AlgorithmId
  results: AlgorithmResult | null

  // custom controls
  status: Status
  speed: SpeedLevel

  // drag mode
  dragMode: DragMode
  isMouseDown: boolean

  // statistics
  stats: {
    visitedCount: number
    pathLength: number
    executionMs: number
  } | null
}

interface VisualizerActions {
  // grid actions
  setCell: (row: number, col: number, type: Cell['type']) => void
  setCellWeight: (row: number, col: number, weight: number) => void
  setStartNode: (coordinate: Coordinate) => void
  setEndNode: (coordinate: Coordinate) => void
  clearGrid: () => void
  clearPath: () => void
  resetGrid: () => void

  // algorithm
  setAlgorithm: (id: AlgorithmId) => void
  runAlgorithm: () => void
  setResult: (results: AlgorithmResult | null) => void

  // custom controls actions
  setStatus: (state: Status) => void
  setSpeed: (speed: SpeedLevel) => void

  // drag mode
  setDragMode: (fashion: DragMode) => void
  setMouseDown: (down: boolean) => void

  // statistics
  setStats: (stats: VisualizerState['stats']) => void
}

type VisualizerStore = VisualizerState & VisualizerActions

export const useVisualizerStore = create<VisualizerStore>()(
  devtools(
    (set, get) => ({
      grid: createGrid(DEFAULT_GRID_SETUP.rows, DEFAULT_GRID_SETUP.cols, DEFAULT_START, DEFAULT_END),
      gridSetup: DEFAULT_GRID_SETUP,
      startNode: DEFAULT_START,
      endNode: DEFAULT_END,
      selectedAlgorithm: 'dijkstra',
      results: null,
      status: 'idle',
      speed: 'normal',
      dragMode: null,
      isMouseDown: false,
      stats: null,

      setCell: (row, col, type) =>
        set(
          (state) => {
            const newGrid = state.grid.map((r) => [...r]);
            const cell = { ...newGrid[row]![col]! };

            if (cell.type === 'start' || cell.type === 'end') return state;
            cell.type = type;
            newGrid[row]![col] = cell;
            return { grid: newGrid };
          },
          false,
          'setCell'
        ),

      setCellWeight: (row, col, weight) =>
        set(
          (state) => {
            const newGrid = state.grid.map((r) => [...r]);
            newGrid[row]![col] = { ...newGrid[row]![col]!, weight, type: 'weight' };
            return { grid: newGrid };
          },
          false,
          'setCellWeight'
        ),

      setStartNode: (coord) =>
        set(
          (state) => {
            const newGrid = state.grid.map((r) => [...r]);
            const prev = state.startNode;

            if (newGrid[prev.row]![prev.col]!.type === 'start') {
              newGrid[prev.row]![prev.col] = {
                ...newGrid[prev.row]![prev.col]!,
                type: 'empty',
              };
            }

            if (newGrid[coord.row]![coord.col]!.type !== 'end') {
              newGrid[coord.row]![coord.col] = {
                ...newGrid[coord.row]![coord.col]!,
                type: 'start',
              };
              return { grid: newGrid, startNode: coord };
            }
            return state;
          },
          false,
          'setStartNode'
        ),

      setEndNode: (coord) =>
        set(
          (state) => {
            const newGrid = state.grid.map((r) => [...r]);
            const prev = state.endNode;

            if (newGrid[prev.row]![prev.col]!.type === 'end') {
              newGrid[prev.row]![prev.col] = {
                ...newGrid[prev.row]![prev.col]!,
                type: 'empty',
              };
            }

            if (newGrid[coord.row]![coord.col]!.type !== 'start') {
              newGrid[coord.row]![coord.col] = {
                ...newGrid[coord.row]![coord.col]!,
                type: 'end',
              };
              return { grid: newGrid, endNode: coord };
            }
            return state;
          },
          false,
          'setEndNode'
        ),

      clearPath: () =>
        set(
          (state) => ({
            grid: state.grid.map((row) =>
              row.map((cell) =>
                cell.type === 'visited' || cell.type === 'path'
                  ? { ...cell, type: 'empty' as const }
                  : cell
              )
            ),
            results: null,
            status: 'idle',
            stats: null,
          }),
          false,
          'clearPath'
        ),

      clearGrid: () => {
        const { gridSetup, startNode, endNode } = get();
        set(
          {
            grid: createGrid(gridSetup.rows, gridSetup.cols, startNode, endNode),
            results: null,
            status: 'idle',
            stats: null,
          },
          false,
          'clearGrid'
        );
      },

      resetGrid: () =>
        set(
          {
            grid: createGrid(
              DEFAULT_GRID_SETUP.rows,
              DEFAULT_GRID_SETUP.cols,
              DEFAULT_START,
              DEFAULT_END
            ),
            startNode: DEFAULT_START,
            endNode: DEFAULT_END,
            results: null,
            status: 'idle',
            stats: null,
          },
          false,
          'resetGrid'
        ),

      setAlgorithm: (id) => set({ selectedAlgorithm: id }, false, 'setAlgorithm'),

      runAlgorithm: async () => {
        const { grid, startNode, endNode, selectedAlgorithm, setCell, setResult, setStats, clearPath } = get()

        clearPath()

        const algo = ALGORITHMS[selectedAlgorithm] ?? bfs
        const t0 = performance.now()
        const result = algo(grid, startNode, endNode)
        const executionMs = performance.now() - t0

        setResult(result)
        set({ status: 'running' }, false, 'runAlgorithm')

        const myRun = ++runId

        for (const step of result.steps) {
          if (myRun !== runId) return
          for (const c of step.cells) {
            setCell(c.row, c.col, step.type === 'visit' ? 'visited' : 'path')
          }
          // Read speed fresh each tick so changing it mid-run takes effect.
          await sleep(SPEED_MAP[get().speed])
        }

        if (myRun === runId) {
          set({ status: 'done' }, false, 'runAlgorithm')
          setStats({
            visitedCount: result.visitedCount,
            pathLength: result.pathLength,
            executionMs,
          })
        }
      },

      setResult: (results) => set({ results }, false, 'setResult'),

      setStatus: (status) => set({ status }, false, 'setStatus'),

      setSpeed: (speed) => set({ speed }, false, 'setSpeed'),

      setDragMode: (dragMode) => set({ dragMode }, false, 'setDragMode'),
      setMouseDown: (isMouseDown) => set({ isMouseDown }, false, 'setMouseDown'),

      setStats: (stats) => set({ stats }, false, 'setStats'),
    }),
    { name: 'PathfinderStore' }
  )
);

export const selectGrid = (s: VisualizerStore) => s.grid;
export const selectStartNode = (s: VisualizerStore) => s.startNode;
export const selectEndNode = (s: VisualizerStore) => s.endNode;
export const selectStatus = (s: VisualizerStore) => s.status;
export const selectAlgorithm = (s: VisualizerStore) => s.selectedAlgorithm;
export const selectSpeed = (s: VisualizerStore) => s.speed;
export const selectSpeedMs = (s: VisualizerStore) => SPEED_MAP[s.speed];
export const selectStats = (s: VisualizerStore) => s.stats;
export const selectDragMode = (s: VisualizerStore) => s.dragMode;
export const selectIsMouseDown = (s: VisualizerStore) => s.isMouseDown;