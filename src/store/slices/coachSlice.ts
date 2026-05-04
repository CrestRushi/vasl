import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Coach } from "@/types/coach";

interface CoachState {
  list: Coach[];
  onDemand: boolean;
}

const initialState: CoachState = {
  list: [],
  onDemand: true,
};

const coachSlice = createSlice({
  name: "coach",
  initialState,
  reducers: {
    setCoaches(state, action: PayloadAction<Coach[]>) {
      state.list = action.payload;
    },
    removeCoach(state, action: PayloadAction<number>) {
      state.list = state.list.filter((c) => c.id !== action.payload);
    },
    addCoach(state, action: PayloadAction<Coach>) {
      state.list = [...state.list, action.payload];
    },
    setOnDemand(state, action: PayloadAction<boolean>) {
      state.onDemand = action.payload;
    },
  },
});

export const { setCoaches, removeCoach, addCoach, setOnDemand } = coachSlice.actions;
export default coachSlice.reducer;
