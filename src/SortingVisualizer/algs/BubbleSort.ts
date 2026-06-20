import type { SortResult, SortStep } from '@/types/sortIndex'

export function bubbleSort(input: number[]): SortResult {
    const arr = [...input]
    const steps: SortStep[] = []
    let comparisons = 0
    let swaps = 0

    for (let i = 0; i < arr.length; i++) {
        for (let j = arr.length - 1; j > i; j--) {
            comparisons++
            steps.push({ array: [...arr], highlights: [j, j - 1], type: 'compare' })

            if (arr[j]! < arr[j - 1]!) {
                [arr[j], arr[j - 1]] = [arr[j - 1]!, arr[j]!]
                swaps++
                steps.push({ array: [...arr], highlights: [j, j - 1], type: 'swap' })
            }
        }
    }

    return { steps, comparisons, swaps }
}
