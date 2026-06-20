import type { SortResult, SortStep } from '@/types/sortIndex'

export function mergeSort(input: number[]): SortResult {
    const arr = [...input]
    const steps: SortStep[] = []
    let comparisons = 0

    const merge = (start: number, mid: number, end: number) => {
        const merged: number[] = []
        let p = start
        let q = mid + 1

        while (p <= mid || q <= end) {
            if (p > mid) {
                merged.push(arr[q++]!)
            } else if (q > end) {
                merged.push(arr[p++]!)
            } else {
                comparisons++
                if (arr[p]! < arr[q]!) merged.push(arr[p++]!)
                else merged.push(arr[q++]!)
            }
        }

        // Merge sort overwrites the range in place rather than swapping — one
        // 'overwrite' step per written slot.
        for (let i = 0; i < merged.length; i++) {
            arr[start + i] = merged[i]!
            steps.push({ array: [...arr], highlights: [start + i], type: 'overwrite' })
        }
    }

    const sort = (start: number, end: number) => {
        if (start >= end) return
        const mid = Math.floor((start + end) / 2)
        sort(start, mid)
        sort(mid + 1, end)
        merge(start, mid, end)
    }

    sort(0, arr.length - 1)

    // Swaps aren't a meaningful metric for merge sort; report 0.
    return { steps, comparisons, swaps: 0 }
}
