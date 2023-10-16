import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import zoomReducer from '../Redux/features/zoom/zoom';
import coordinatesReducer from '../Redux/features/coordinates/coordinates';

export const store = configureStore({
  reducer: {
    zoom: zoomReducer,
    coordinates: coordinatesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;