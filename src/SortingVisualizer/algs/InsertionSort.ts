import type { SortResult, SortStep } from '@/types/sortIndex'

export function insertionSort(input: number[]): SortResult {
    const arr = [...input]
    const steps: SortStep[] = []
    let comparisons = 0
    let swaps = 0

    for (let i = 1; i < arr.length; i++) {
        const current = arr[i]!
        let j = i - 1

        while (j >= 0 && arr[j]! > current) {
            comparisons++
            arr[j + 1] = arr[j]!
            swaps++
            steps.push({ array: [...arr], highlights: [j, j + 1], type: 'overwrite' })
            j--
        }

        arr[j + 1] = current
        steps.push({ array: [...arr], highlights: [j + 1], type: 'overwrite' })
    }

    return { steps, comparisons, swaps }
}
