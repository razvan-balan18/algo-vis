import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type {
  SortAlgorithmId,
  SortResult,
  SortStats,
  SortStepType,
  Status,
  SpeedLevel,
} from '@/types/sortIndex'
import { SPEED_MAP } from '@/types/sortIndex'
import { bubbleSort } from '@/SortingVisualizer/algs/BubbleSort'
import { insertionSort } from '@/SortingVisualizer/algs/InsertionSort'
import { mergeSort } from '@/SortingVisualizer/algs/MergeSort'
import { quickSort } from '@/SortingVisualizer/algs/QuickSort'

type SortFn = (array: number[]) => SortResult

const ALGORITHMS: Record<SortAlgorithmId, SortFn> = {
  bubble: bubbleSort,
  insertion: insertionSort,
  merge: mergeSort,
  quick: quickSort,
}

let runId = 0
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

const DEFAULT_SIZE = 40

function createArray(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 95) + 5)
}

interface SortState {
  array: number[]
  arraySize: number

  highlights: number[]
  highlightType: SortStepType

  selectedAlgorithm: SortAlgorithmId
  status: Status
  speed: SpeedLevel
  stats: SortStats | null
}

interface SortActions {
  generateArray: () => void
  setArraySize: (size: number) => void
  setAlgorithm: (id: SortAlgorithmId) => void
  runSort: () => void
  setSpeed: (speed: SpeedLevel) => void
  setStatus: (status: Status) => void
}

type SortStore = SortState & SortActions

export const useSortStore = create<SortStore>()(
  devtools(
    (set, get) => ({
      array: createArray(DEFAULT_SIZE),
      arraySize: DEFAULT_SIZE,
      highlights: [],
      highlightType: 'compare',
      selectedAlgorithm: 'bubble',
      status: 'idle',
      speed: 'normal',
      stats: null,

      generateArray: () => {
        runId++ // cancel any in-flight run
        const { arraySize } = get()
        set(
          {
            array: createArray(arraySize),
            highlights: [],
            status: 'idle',
            stats: null,
          },
          false,
          'generateArray'
        )
      },

      setArraySize: (size) => {
        runId++
        set(
          {
            arraySize: size,
            array: createArray(size),
            highlights: [],
            status: 'idle',
            stats: null,
          },
          false,
          'setArraySize'
        )
      },

      setAlgorithm: (selectedAlgorithm) =>
        set({ selectedAlgorithm }, false, 'setAlgorithm'),

      runSort: async () => {
        const { array, selectedAlgorithm } = get()

        const algo = ALGORITHMS[selectedAlgorithm]
        const t0 = performance.now()
        const result = algo(array)
        const executionMs = performance.now() - t0

        set({ status: 'running', stats: null }, false, 'runSort')

        const myRun = ++runId

        for (const step of result.steps) {
          if (myRun !== runId) return
          set(
            { array: step.array, highlights: step.highlights, highlightType: step.type },
            false,
            'runSort/step'
          )
          await sleep(SPEED_MAP[get().speed])
        }

        if (myRun === runId) {
          set(
            {
              status: 'done',
              highlights: [],
              stats: {
                comparisons: result.comparisons,
                swaps: result.swaps,
                executionMs,
              },
            },
            false,
            'runSort/done'
          )
        }
      },

      setSpeed: (speed) => set({ speed }, false, 'setSpeed'),
      setStatus: (status) => set({ status }, false, 'setStatus'),
    }),
    { name: 'SortStore' }
  )
)

export const selectArray = (s: SortStore) => s.array
export const selectStatus = (s: SortStore) => s.status
export const selectAlgorithm = (s: SortStore) => s.selectedAlgorithm
export const selectSpeed = (s: SortStore) => s.speed
export const selectStats = (s: SortStore) => s.stats
