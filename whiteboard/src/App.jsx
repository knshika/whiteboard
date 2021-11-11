import { useLayoutEffect, useState } from "react";
import "./App.css";
import Options from "./components/Options";
import ToolsBar from "./components/ToolsBar";

function App() {
  const [cursorStyles, setCursorStyles] = useState({
    top: 0,
    left: 0,
  });
  const [canvas, setCanvas] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [lineWidth, setLineWidth] = useState(5);
  const [drawing, setDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [restoreArray, setRestoreArray] = useState([]);
  const [color, setColor] = useState("#000000");
  const [tool, setTool] = useState("pen");
  const [redoArray, setRedoArray] = useState([]);

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    setCanvas(canvas);
    setCtx(ctx);
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    ctx.styleStroke = "#000080";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 5;
  }, []);

  const handleMouseMove = (e) => {
    if (!drawing) return;
    if (tool === "pen") {
      ctx.strokeStyle = color;
    } else if (tool === "eraser") {
      ctx.strokeStyle = "#fff";
    }
    if (tool === "fill") {
      return;
    }

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    setLastX(e.clientX);
    setLastY(e.clientY);
  };
  const handleMouseDown = (e) => {
    if (tool == "fill") {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    setDrawing(true);
    setLastX(e.clientX);
    setLastY(e.clientY);
  };

  const handleMouseUp = (e) => {
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setRestoreArray([...restoreArray, img]);
    setDrawing(false);
  };

  return (
    <div
      className="App"
      //doubt
      onMouseMove={(e) => {
        const cursor = document.querySelector(".cursor");
        // cursor.style.top = e.clientY+"px";
        // cursor.style.left = e.clientX+"px";
        cursor.style.height = lineWidth + "px";
        cursor.style.width = lineWidth + "px";
        // cursor.style.border = "1px solid" + color;
        setCursorStyles({
          top: e.clientY,
          left: e.clientX,
        });
      }}
    >
      <div
        className="cursor"
        style={{
          border: tool === "pen" ? `1px solid ${color}` : "1px solid #000",
          // height: lineWidth,
          // width: lineWidth,
          ...cursorStyles,
        }}
      ></div>
      <canvas
        id="canvas"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      ></canvas>
      <Options
        lineWidth={lineWidth}
        setLineWidth={setLineWidth}
        color={color}
        setColor={setColor}
        ctx={ctx}
      />
      <ToolsBar
        tool={tool}
        setTool={setTool}
        restoreArray={restoreArray}
        setRestoreArray={setRestoreArray}
        redoArray={redoArray}
        setRedoArray={setRedoArray}
        ctx={ctx}
        canvas={canvas}
      />
    </div>
  );
}

export default App;
