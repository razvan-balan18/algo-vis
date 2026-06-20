export class MinHeap<T> {
    private items: { value: T; priority: number }[] = [];

    get size() {
        return this.items.length;
    }

    push(value: T, priority: number) {
        this.items.push({ value, priority });
        this.bubbleUp(this.items.length - 1);
    }

    pop(): T | undefined {
        const items = this.items;
        if (items.length === 0) return undefined;

        const top = items[0]!;
        const last = items.pop()!;
        if (items.length > 0) {
            items[0] = last;
            this.bubbleDown(0);
        }
        return top.value;
    }

    private bubbleUp(i: number) {
        const items = this.items;
        while (i > 0) {
            const parent = (i - 1) >> 1;
            if (items[i]!.priority >= items[parent]!.priority) break;
            [items[i], items[parent]] = [items[parent]!, items[i]!];
            i = parent;
        }
    }

    private bubbleDown(i: number) {
        const items = this.items;
        const n = items.length;
        while (true) {
            let smallest = i;
            const left = 2 * i + 1;
            const right = 2 * i + 2;

            if (left < n && items[left]!.priority < items[smallest]!.priority) smallest = left;
            if (right < n && items[right]!.priority < items[smallest]!.priority) smallest = right;
            if (smallest === i) break;

            [items[i], items[smallest]] = [items[smallest]!, items[i]!];
            i = smallest;
        }
    }
}
