const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export const insertionSort = async function(array: number[], onUpdate: (arr: number[]) => void) {
    const arr = [...array];
    await insertion_sort(arr, onUpdate);
    return arr;
}

async function insertion_sort(array: number[], onUpdate: (arr: number[]) => void): Promise<void> {
    for (let i = 0;i < array.length; i++) {
        let currentValue = array[i]
        let j = i - 1
        for (;j >= 0 && array[j] > currentValue; j--) {
            array[j + 1] = array[j]
            onUpdate([...array])
            await sleep(10)
        }
        array[j + 1] = currentValue
        onUpdate([...array])
        await sleep(10)
    }
}

