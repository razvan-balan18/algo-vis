import './App.css'
import GraphVisualizer from './GraphVisualizer/GraphVisualizer';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import { BrowserRouter } from 'react-router'

function App() {

  return (

    <BrowserRouter>
      {/* <SortingVisualizer></SortingVisualizer> */}
      <GraphVisualizer></GraphVisualizer>
    </BrowserRouter>
  )
}

export default App
