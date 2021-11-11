import React from "react";
import ToolsList from "./ToolsList";
import "../styles/ToolsBar.css";

const ToolsBar = ({ tool, setTool }) => {
  const Addtext = () => {};
  const undoTask = () => {};
  const redoTask = () => {};
  const resetPage = () => {};

  return (
    <div className="tools">
      {ToolsList.map((Tool) => (
        <div
          className={tool === Tool.name ? "tool selected" : "tool"}
          onClick={() => {
            Tool.name === "text"
              ? Addtext()
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

      {/* //implementing add text
      <div
        className="tool"
        onClick={() => {
          setAddtext();
        }}
      >
        <span className="tooltipLabel">add text</span>
        <img src={`/images/text.png`} />
      </div>
     
      <div
        className="tool"
        onClick={() => {
          undoTask();
        }}
      >
        <span className="tooltipLabel">undo</span>
        <img src={`/images/undo.png`} />
      </div>
     
      <div
        className="tool"
        onClick={() => {
          redoTask();
        }}
      >
        <span className="tooltipLabel">redo</span>
        <img src={`/images/redo.png`} />
      </div>
     
      <div
        className="tool"
        onClick={() => {
          resetPage();
        }}
      >
        <span className="tooltipLabel">reset</span>
        <img src={`/images/delete.png`} />
      </div>  */}
    </div>
  );
};

export default ToolsBar;
