import { configureStore } from "@reduxjs/toolkit";
import actionsReducer from "./reducers/actionsReducer";
import canvasReducer from "./reducers/canvasReducer";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

const customMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const store = configureStore({
  reducer: { canvas: canvasReducer, actions: actionsReducer },
  middleware: customMiddleware,
});

export default store;
