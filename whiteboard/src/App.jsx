import { useLayoutEffect, useState } from "react";
import "./App.css";
import Options from "./components/Options";
import ToolsBar from "./components/ToolsBar";
import AddTextCard from "./components/AddTextCard";

function App() {
  const [cursorStyles, setCursorStyles] = useState({ top: 0, left: 0 });
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

  //function to create line
  const createLine = (x, y) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = color;
    console.log("createLine" + restoreArray.length);
    restoreArray.forEach((element) => {
      ctx.putImageData(element, 0, 0);
    });
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  //function to create rectangle
  const createRectangle = (x, y) => {
    const mouseX = parseInt(x - canvas.offsetLeft);
    const mouseY = parseInt(y - canvas.offsetTop);
    const width = mouseX - lastX;
    const height = mouseY - lastY;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    restoreArray.forEach((element) => {
      if (element) {
        ctx.putImageData(element, 0, 0);
      }
    });
    ctx.strokeStyle = color;
    ctx.strokeRect(lastX, lastY, width, height);
  };

  //function to create circle
  const createCircle = (x, y) => {
    const mouseX = parseInt(x - canvas.offsetLeft);
    const mouseY = parseInt(y - canvas.offsetTop);
    const radius = Math.sqrt(
      Math.pow(mouseX - lastX, 2) + Math.pow(mouseY - lastY, 2)
    );
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    restoreArray.forEach((element) => {
      if (element) {
        ctx.putImageData(element, 0, 0);
      }
    });
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(lastX, lastY, radius, 2 * Math.PI, 0);
    ctx.stroke();
  };

  //function to move screen with cursor
  const moveScreen = (x, y) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const mouseX = parseInt(x - canvas.offsetLeft);
    const mouseY = parseInt(y - canvas.offsetTop);
    const width = mouseX - lastX;
    const height = mouseY - lastY;
    restoreArray.forEach((element) => {
      if (element) ctx.putImageData(element, width, height);
    });
  };

  const drawStroke = (x, y, strokeColor) => {
    ctx.strokeStyle = strokeColor;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    setLastX(x);
    setLastY(y);
  };
  //Function which takes care of mouse move with the current tool
  const handleMouseMove = (e) => {
    if (!drawing) return;

    switch (tool) {
      case "fill":
        break;
      case "line":
        createLine(e.clientX, e.clientY);
        break;
      case "circle":
        createCircle(e.clientX, e.clientY);
        break;
      case "rectangle":
        createRectangle(e.clientX, e.clientY);
        break;
      case "move":
        moveScreen(e.clientX, e.clientY);
        break;
      case "pen":
        drawStroke(e.clientX, e.clientY, color);
        break;
      case "eraser":
        drawStroke(e.clientX, e.clientY, "#fff");
        break;

      default:
        break;
    }
  };

  //function which handles mouse when the mouse is pressed
  const handleMouseDown = (e) => {
    if (tool === "fill") {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // if (tool === "rectangle") {
    //   setLastX(e.clientX);
    //   setLastY(e.clientY);
    // }
    setDrawing(true);
    setLastX(e.clientX);
    setLastY(e.clientY);
  };

  //function which handles mouse when the mouse is released
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
        cursor.style.height = lineWidth + "px";
        cursor.style.width = lineWidth + "px";
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
      {tool === "text" ? (
        <AddTextCard
          ctx={ctx}
          canvas={canvas}
          restoreArray={restoreArray}
          setRestoreArray={setRestoreArray}
          setTool={setTool}
        />
      ) : (
        ""
      )}
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
