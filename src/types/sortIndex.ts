export type { Status, SpeedLevel } from './pathIndex'
export { SPEED_MAP } from './pathIndex'

export type SortAlgorithmId = 'bubble' | 'insertion' | 'merge' | 'quick'

export interface SortAlgorithmInfo {
    id: SortAlgorithmId
    name: string
    description: string
}

export const SORT_ALGORITHM_LIST: SortAlgorithmInfo[] = [
    {
        id: 'bubble',
        name: 'Bubble Sort',
        description: 'repeatedly swaps adjacent out-of-order pairs',
    },
    {
        id: 'insertion',
        name: 'Insertion Sort',
        description: 'builds the sorted prefix one element at a time',
    },
    {
        id: 'merge',
        name: 'Merge Sort',
        description: 'divide and conquer, merges sorted halves',
    },
    {
        id: 'quick',
        name: 'Quick Sort',
        description: 'partitions around a pivot, recurses on each side',
    },
]

export type SortStepType = 'compare' | 'swap' | 'overwrite'

export type SortStep = {
    array: number[]
    highlights: number[]
    type: SortStepType
}

export interface SortResult {
    steps: SortStep[]
    comparisons: number
    swaps: number
}

export type SortStats = {
    comparisons: number
    swaps: number
    executionMs: number
}

export const BAR_COLORS = {
    default: 'bg-sky-400',
    compare: 'bg-yellow-300',
    active: 'bg-red-500',
    sorted: 'bg-green-500',
} as const
