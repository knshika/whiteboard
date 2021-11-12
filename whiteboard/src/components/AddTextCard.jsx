import React from "react";
import "../styles/AddTextCard.css";

const AddTextCard = ({
  ctx,
  canvas,
  restoreArray,
  setRestoreArray,
  setTool,
}) => {
  const addText = () => {
    if (!document.querySelector("#text").value) return;
    ctx.font = "30px Arial";
    ctx.fillText(
      document.querySelector("#text").value,
      document.querySelector("#x").value,
      document.querySelector("#y").value
    );
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setRestoreArray([...restoreArray, img]);
    setTool("pen");
  };

  const closeCard = () => {
    setTool("pen");
  };

  return (
    <div className="card">
      <h2 className="title">Add Text</h2>
      <div className="coordinateInput">
        <div>
          <label htmlFor="x">X :</label>
          <input
            type="text"
            id="x"
            placeholder="X coordinate"
            defaultValue="500"
          />
        </div>
        <div>
          <label htmlFor="y">Y :</label>
          <input
            type="text"
            id="y"
            placeholder="Y coordinate"
            defaultValue="100"
          />
        </div>
      </div>
      <div className="textInput">
        <label htmlFor="text"></label>
        <input type="text" id="text" placeholder="Add text" />
      </div>
      <div className="button">
        <button className="btn add" onClick={addText}>
          ADD
        </button>
        <button className="btn close" onClick={closeCard}>
          CLOSE
        </button>
      </div>
    </div>
  );
};

export default AddTextCard;
