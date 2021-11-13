import React from "react";
import { useDispatch } from "react-redux";
import {
  useCanvasState,
  setLineWidth,
  setColor,
} from "../redux/reducers/canvasReducer";
import "../styles/Options.css";

const Options = ({ ctx }) => {
  const { lineWidth, color } = useCanvasState();
  const dispatch = useDispatch();

  return (
    <div className="options">
      <div>
        <label htmlFor="lineWidth">Width :</label>
        <input
          type="range"
          name="Width"
          id="lineWidth"
          value={lineWidth}
          onChange={(e) => {
            const _lineWidth = parseInt(e.target.value);
            dispatch(setLineWidth(_lineWidth));
            ctx.lineWidth = _lineWidth;
          }}
        />
      </div>
      <div>
        <label htmlFor="color">Color :</label>
        <input
          type="color"
          name="Color"
          id="color"
          value={color}
          onChange={(e) => {
            const _color = e.target.value;
            dispatch(setColor(_color));
            ctx.color = _color;
          }}
        />
      </div>
    </div>
  );
};

export default Options;
