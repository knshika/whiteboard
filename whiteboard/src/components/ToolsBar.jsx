import React from "react";
import ToolsList from "./ToolsList";
import "../styles/ToolsBar.css";

const ToolsBar = ({
  tool,
  setTool,
  restoreArray,
  setRestoreArray,
  redoArray,
  setRedoArray,
  ctx,
  canvas,
}) => {
  const AddText = () => {};

  const undoTask = () => {
    let newArray = [...restoreArray];
    const popped = newArray.pop();
    if (!popped) return;
    setRedoArray([...redoArray, popped]);
    setRestoreArray(newArray);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    newArray.forEach((data) => {
      if (data) {
        ctx.putImageData(data, 0, 0);
      }
    });
  };

  const redoTask = () => {
    let popped = redoArray.pop();
    if (!popped) return;
    let newArray = [...restoreArray, popped];
    setRestoreArray(newArray);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    newArray.forEach((data) => {
      if (data) {
        ctx.putImageData(data, 0, 0);
      }
    });
  };

  const resetPage = () => {
    setRestoreArray([]);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="tools">
      {ToolsList.map((Tool) => (
        <div
          className={tool === Tool.name ? "tool selected" : "tool"}
          onClick={() => {
            Tool.name === "text"
              ? AddText()
              : Tool.name === "undo"
              ? undoTask()
              : Tool.name === "redo"
              ? redoTask()
              : Tool.name === "delete"
              ? resetPage()
              : setTool(Tool.name);
          }}
          key={Tool.name}
        >
          <span className="tooltipLabel">{Tool.name}</span>
          <img src={`/images/${Tool.name}.png`} />
        </div>
      ))}
    </div>
  );
};

export default ToolsBar;
