import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PlatformUser } from "@/types/user";

interface UserState {
  list: PlatformUser[];
  selectedId: number | null;
}

const initialState: UserState = {
  list: [],
  selectedId: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<PlatformUser[]>) {
      state.list = action.payload;
    },
    setSelectedUser(state, action: PayloadAction<number | null>) {
      state.selectedId = action.payload;
    },
  },
});

export const { setUsers, setSelectedUser } = userSlice.actions;
export default userSlice.reducer;
