import React from "react";
import "../styles/ToolsBar.css";
import {
  addToRedoArray,
  setRedoArray,
  setRestoreArray,
  useActionsState,
} from "../redux/reducers/actionsReducer";
import { useDispatch } from "react-redux";
import { setTool, useCanvasState } from "../redux/reducers/canvasReducer";

const ToolsList = [
  "pen",
  "move",
  "eraser",
  "line",
  "rectangle",
  "circle",
  "fill",
  "text",
  "undo",
  "redo",
  "delete",
];

const ToolsBar = ({ ctx, canvas }) => {
  const { restoreArray, redoArray } = useActionsState();
  const { tool } = useCanvasState();
  const dispatch = useDispatch();

  const undoTask = () => {
    let newArray = [...restoreArray];
    const popped = newArray.pop();
    if (!popped) return;
    dispatch(addToRedoArray(popped));
    dispatch(setRestoreArray(newArray));
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    newArray.forEach((data) => {
      if (data) {
        ctx.putImageData(data, 0, 0);
      }
    });
  };

  const redoTask = () => {
    let _redoArray = [...redoArray];
    let popped = _redoArray.pop();
    dispatch(setRedoArray(_redoArray));
    if (!popped) return;
    let newArray = [...restoreArray, popped];
    dispatch(setRestoreArray(newArray));
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    newArray.forEach((data) => {
      if (data) {
        ctx.putImageData(data, 0, 0);
      }
    });
  };

  const resetPage = () => {
    dispatch(setRestoreArray([]));
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="tools">
      {ToolsList.map((Tool, index) => (
        <div
          className={tool === Tool ? "tool selected" : "tool"}
          onClick={() => {
            Tool === "undo"
              ? undoTask()
              : Tool === "redo"
              ? redoTask()
              : Tool === "delete"
              ? resetPage()
              : dispatch(setTool(Tool));
          }}
          key={index}
        >
          <span className="tooltipLabel">{Tool}</span>
          <img src={`/images/${Tool}.png`} />
        </div>
      ))}
    </div>
  );
};

export default ToolsBar;
