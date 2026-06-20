import type { SortResult, SortStep } from '@/types/sortIndex'

export function quickSort(input: number[]): SortResult {
    const arr = [...input]
    const steps: SortStep[] = []
    let comparisons = 0
    let swaps = 0

    const partition = (start: number, end: number): number => {
        const pivot = arr[start]!
        let i = start + 1

        for (let j = start + 1; j <= end; j++) {
            comparisons++
            steps.push({ array: [...arr], highlights: [j, start], type: 'compare' })

            if (arr[j]! < pivot) {
                [arr[i], arr[j]] = [arr[j]!, arr[i]!]
                swaps++
                steps.push({ array: [...arr], highlights: [i, j], type: 'swap' })
                i++
            }
        }

        [arr[start], arr[i - 1]] = [arr[i - 1]!, arr[start]!]
        swaps++
        steps.push({ array: [...arr], highlights: [start, i - 1], type: 'swap' })
        return i - 1
    }

    const sort = (start: number, end: number) => {
        if (start < end) {
            const pivotPos = partition(start, end)
            sort(start, pivotPos - 1)
            sort(pivotPos + 1, end)
        }
    }

    sort(0, arr.length - 1)

    return { steps, comparisons, swaps }
}
