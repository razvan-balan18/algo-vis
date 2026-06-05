import { useEffect, useState } from 'react';
import './App.css'

function App() {

  useEffect(() => {
    reset_array()
  }, []);

  const [array, setArray] = useState<number[]>([]);

  function reset_array() {
    let arr = []
    for (let i = 0; i <= 40; i++) {
      arr.push(Math.floor(Math.random() * 100) + 1)
    }
    setArray(arr)
  }



  return (
    <>
      <div className="flex items-end gap-1 p-4">
        {array.map((value, index) => (
          <div key={index} className="w-2 bg-black" style={{ height: `${value}px` }}>
          </div>
        ))}
      </div>
      <button onClick={reset_array} className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 active:bg-gray-600 transition-colors cursor-pointer ml-4">
        Generate new array
      </button>
    </>

  )
}

export default App
