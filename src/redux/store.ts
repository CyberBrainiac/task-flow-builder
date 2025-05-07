import { configureStore } from "@reduxjs/toolkit";
import flowReducer from "./flowSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { flowStorageMiddleware } from "./flowMiddleware";

export const store = configureStore({
  reducer: {
    flow: flowReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(flowStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
