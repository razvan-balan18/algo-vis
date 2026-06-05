const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export const bubbleSort = async function(array: number[], onUpdate: (arr: number[]) => void) {
    const arr = [...array];

    for (let i = 0; i < arr.length; i++) {
        for (let j = arr.length - 1; j > i; j--) {
            if (arr[j] < arr[j - 1]) {
                [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
                onUpdate([...arr]);
                await sleep(50);
            }
        }
    }
    return arr;
}
