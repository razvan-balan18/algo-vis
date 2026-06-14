import './App.css'
import { Board } from './GraphVisualizer/Board';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import { BrowserRouter } from 'react-router'

function App() {

  return (

    <BrowserRouter>
     {/* < SortingVisualizer /> */}
      < Board />
    </BrowserRouter>
  )
}

export default App
