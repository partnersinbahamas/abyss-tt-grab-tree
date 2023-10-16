import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Coordinates } from "../../../Types/Coordinates";

const initialState: Coordinates = {
  x: -6,
  y: 58,
};

const coordinatesSlice = createSlice({
  name: 'coordinates',
  initialState,
  reducers: {
    set: (state: Coordinates, actions: PayloadAction<Coordinates>) => state = actions.payload,
    reset: () => {
      return { x: 100, y: 50 };
    },
    increaseX: (state: Coordinates) => {
      state = {...state, x: state.x += 20}
    },

    increaseY: (state: Coordinates) => {
      state = {...state, x: state.y += 20}
    },

    decreaseX: (state: Coordinates) => {
      state = {...state, x: state.x -= 20}
    },

    decreaseY: (state: Coordinates) => {
      state = {...state, x: state.y -= 20}
    },
  },
});

export const { set, reset, increaseX, decreaseX, decreaseY, increaseY } = coordinatesSlice.actions;
export default coordinatesSlice.reducer;