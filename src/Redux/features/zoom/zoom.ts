import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: number = 100;

export const zoomSlice = createSlice({
  name: 'zoom',
  initialState,
  reducers: {
    increase: (state: number, amount: PayloadAction<number>) => {
      return Math.min(state += amount.payload, 200);
    },
    decrease: (state: number, amount: PayloadAction<number>) => {
      return Math.max(state -= amount.payload, 0);
    },
    reset: (state: number) => state = 100,
    set: (state: number, amount: PayloadAction<number>) => state = amount.payload,
  },
});

export const { increase, decrease, reset, set } = zoomSlice.actions;
export default zoomSlice.reducer;
