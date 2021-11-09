import { useState } from 'react'

import './App.css'

function App() {
 
  const handleMouseDown=()=>{

  }

  const handleMouseMove=()=>{
    
  }

  const handleMouseUp=()=>{
    
  }

  return (
    <div className="App">
      <div className="cursor"></div>
      <canvas id="canvas"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      ></canvas>
    </div>
  )
}

export default App
