import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  drawing: false,
  restoreArray: [],
  redoArray: [],
};

export const actionsReducer = createSlice({
  name: "actions",
  initialState,
  reducers: {
    setDrawing: (state, action) => {
      state.drawing = action.payload;
    },
    setRestoreArray: (state, action) => {
      state.restoreArray = action.payload;
    },
    setRedoArray: (state, action) => {
      state.redoArray = action.payload;
    },
    addToRestoreArray: (state, action) => {
      state.restoreArray.push(action.payload);
    },
    addToRedoArray: (state, action) => {
      state.redoArray.push(action.payload);
    },
  },
});

export const {
  setDrawing,
  setRestoreArray,
  setRedoArray,
  addToRestoreArray,
  addToRedoArray,
} = actionsReducer.actions;

export default actionsReducer.reducer;

export const useActionsState = () => {
  return useSelector((state) => state.actions);
};
