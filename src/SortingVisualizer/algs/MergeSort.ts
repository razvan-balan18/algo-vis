const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export const mergeSort = async function(array: number[], onUpdate: (arr: number[]) => void) {
    const arr = [...array];
    await merge_sort(arr, 0, arr.length - 1, onUpdate);
    return arr;
}

async function merge(array: number[], start: number, mid: number, end: number, onUpdate: (arr: number[]) => void): Promise<void> {
    let p: number = start;
    let q: number = mid + 1;
    let arr: number[] = [];

    for (let i: number = start; i <= end; i++) {
        if (p > mid) {
            arr.push(array[q++]);
        } else if (q > end) {
            arr.push(array[p++]);
        } else if (array[p] < array[q]) {
            arr.push(array[p++]);
        } else {
            arr.push(array[q++]);
        }
    }

    for (let i = 0; i < arr.length; i++) {
        array[start++] = arr[i];
        onUpdate([...array]);
        await sleep(10);
    }
}

async function merge_sort(array: number[], start: number, end: number, onUpdate: (arr: number[]) => void): Promise<void> {
    if (start < end) {
        let mid = Math.floor((start + end) / 2);
        await merge_sort(array, start, mid, onUpdate);
        await merge_sort(array, mid + 1, end, onUpdate);
        await merge(array, start, mid, end, onUpdate);
    }
}
