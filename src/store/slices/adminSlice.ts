import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CommunityGroup } from "@/types/group";

interface AdminState {
  groups: CommunityGroup[];
}

const initialState: AdminState = {
  groups: [],
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminGroups(state, action: PayloadAction<CommunityGroup[]>) {
      state.groups = action.payload;
    },
    addAdminGroup(state, action: PayloadAction<CommunityGroup>) {
      state.groups = [...state.groups, action.payload];
    },
  },
});

export const { setAdminGroups, addAdminGroup } = adminSlice.actions;
export default adminSlice.reducer;
