import { Bars } from "./Bars";
import { Controls } from "./Controls";
import { Stats } from "./Stats";

export const SortingVisualizer = () => {
    return (
        <div className="flex flex-col items-center gap-4 p-6">
            <Controls />
            <Bars />
            <Stats />
        </div>
    )
}
