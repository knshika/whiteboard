import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToRestoreArray } from "../redux/reducers/actionsReducer";
import { setTool } from "../redux/reducers/canvasReducer";

import "../styles/AddTextCard.css";

const AddTextCard = ({ ctx, canvas }) => {
  const [text, setText] = useState("");
  const [x, setX] = useState(300);
  const [y, setY] = useState(100);
  const dispatch = useDispatch();

  const addText = () => {
    if (!text) return;
    ctx.font = "30px Arial";
    ctx.fillText(text, x, y);
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    dispatch(addToRestoreArray(img));

    dispatch(setTool("pen"));
  };

  const closeCard = () => {
    dispatch(setTool("pen"));
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
            value={x}
            onChange={(e) => setX(e.target.valueAsNumber)}
          />
        </div>
        <div>
          <label htmlFor="y">Y :</label>
          <input
            type="text"
            id="y"
            placeholder="Y coordinate"
            value={y}
            onChange={(e) => setY(e.target.valueAsNumber)}
          />
        </div>
      </div>
      <div className="textInput">
        <label htmlFor="text"></label>
        <input
          type="text"
          id="text"
          placeholder="Add text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
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
