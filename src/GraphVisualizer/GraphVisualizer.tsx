import { Board } from "./Board";
import { Controls } from "./Controls";
import { Stats } from "./Stats";

export const GraphVisualizer = () => {
    return (
        <div className="flex flex-col items-center gap-4 p-6">
            <Controls />
            <Board />
            <Stats />
        </div>
    )
}
