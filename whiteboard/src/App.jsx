import { useLayoutEffect, useState } from 'react'

import './App.css'

function App() {
  const [canvas, setCanvas] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [lineWidth, setLineWidth] = useState(5);
  const [drawing, setDrawing] = useState(false)
  const [lastX, setLastX] = useState(0)
  const [lastY, setLastY] = useState(0)
  const [restoreArray, setRestoreArray] = useState([])
  const [color, setColor] = useState("#000000")

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    setCanvas(canvas);
    setCtx(ctx);
    canvas.height=window.innerHeight;
    canvas.width=window.innerWidth;
    ctx.styleStroke="#000080";
    ctx.lineCap = "round";
   ctx.lineJoin = "round";
   ctx.lineWidth = 5;
  }, [])
 
  
  const handleMouseMove=(e)=>{
    if(!drawing) return;
    ctx.strokeStyle=color;
    ctx.beginPath();
    ctx.moveTo(lastX,lastY);
    ctx.lineTo(e.clientX,e.clientY);
    ctx.stroke();
    setLastX(e.clientX);
    setLastY(e.clientY);

    
  }
  const handleMouseDown=(e)=>{
    setDrawing(true);
    setLastX(e.clientX);
    setLastY(e.clientY);
  }

  const handleMouseUp=(e)=>{
    const img = ctx.getImageData(0,0,canvas.width,canvas.height);
    setRestoreArray([...restoreArray,img]);
    setDrawing(false);
  }

  return (
    <div className="App"
    //doubt
    onMouseMove={(e)=>{
      const cursor=document.querySelector(".cursor");
      cursor.style.top = e.clientY+"px";
      cursor.style.left = e.clientX+"px";
      cursor.style.height = lineWidth+"px";
      cursor.style.width = lineWidth+"px";
      cursor.style.border = "1px solid" + color;
    }}
    >
      <div className="cursor"></div>
      <canvas id="canvas"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      ></canvas>
    </div>  
  );
}

export default App
