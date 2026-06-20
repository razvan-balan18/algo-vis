import './App.css'
import { GraphVisualizer } from './GraphVisualizer/GraphVisualizer';
import { BrowserRouter } from 'react-router'

function App() {

  return (

    <BrowserRouter>
     {/* < SortingVisualizer /> */}
      <GraphVisualizer />
    </BrowserRouter>
  )
}

export default App
