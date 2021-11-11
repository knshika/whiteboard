import React from "react";
import "../styles/Options.css";

const Options = ({ lineWidth, setLineWidth, color, setColor, ctx }) => {
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
            setLineWidth(e.target.value);
            ctx.lineWidth = lineWidth;
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
            setColor(e.target.value);
            ctx.color = color;
          }}
        />
      </div>
    </div>
  );
};

export default Options;
