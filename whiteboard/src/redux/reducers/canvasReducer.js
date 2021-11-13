import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  tool: "pen",
  lineWidth: 5,
  color: "#000",
  lastX: 0,
  lastY: 0,
};

export const canvasReducer = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    setTool: (state, action) => {
      console.log(action.payload);
      state.tool = action.payload;
    },
    setLineWidth: (state, action) => {
      state.lineWidth = action.payload;
    },
    setColor: (state, action) => {
      state.color = action.payload;
    },
    setLastCursor: (state, action) => {
      state.lastX = action.payload.x;
      state.lastY = action.payload.y;
    },
  },
});

export const { setTool, setLineWidth, setColor, setLastCursor } =
  canvasReducer.actions;

export default canvasReducer.reducer;

export const useCanvasState = () => {
  return useSelector((state) => state.canvas);
};
