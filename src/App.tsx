import './App.css'
import { BrowserRouter, Routes, Route, Navigate, NavLink } from 'react-router'
import { GraphVisualizer } from './GraphVisualizer/GraphVisualizer';
import { SortingVisualizer } from './SortingVisualizer/SortingVisualizer';

function NavBar() {
  const link = "rounded px-3 py-1 text-sm font-medium transition-colors"
  const style = ({ isActive }: { isActive: boolean }) =>
    `${link} ${isActive ? 'bg-green-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`

  return (
    <nav className="flex items-center justify-center gap-3 border-b border-slate-300 bg-white p-4">
      <NavLink to="/pathfinding" className={style}>Pathfinding</NavLink>
      <NavLink to="/sorting" className={style}>Sorting</NavLink>
    </nav>
  )
}

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/pathfinding" replace />} />
        <Route path="/pathfinding" element={<GraphVisualizer />} />
        <Route path="/sorting" element={<SortingVisualizer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
