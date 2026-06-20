const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export const quickSort = async function(array: number[], onUpdate: (arr: number[]) => void) {
    const arr = [...array];
    await quick_sort(arr, 0, arr.length - 1, onUpdate);
    return arr;
}

async function pivot(array: number[], start: number, end: number, onUpdate: (arr: number[]) => void): Promise<number> {
    let i: number = start + 1;
    let piv: number = array[start];

    for (let j = start + 1; j <= end; j++) {
        if (array[j] < piv) {
            [array[i], array[j]] = [array[j], array[i]];
            onUpdate([...array]);
            await sleep(10);
            ++i;
        }
    }
    [array[start], array[i - 1]] = [array[i - 1], array[start]];
    onUpdate([...array]);
    await sleep(10);
    return i - 1;
}

async function quick_sort(array: number[], start: number, end: number, onUpdate: (arr: number[]) => void): Promise<void> {
    if (start < end) {
        let piv_pos: number = await pivot(array, start, end, onUpdate);
        await quick_sort(array, start, piv_pos - 1, onUpdate);
        await quick_sort(array, piv_pos + 1, end, onUpdate);
    }
}
