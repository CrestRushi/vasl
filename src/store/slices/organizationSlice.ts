import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Organization } from "@/types/organization";

interface OrganizationState {
  list: Organization[];
  currentOrgName: string;
}

const initialState: OrganizationState = {
  list: [],
  currentOrgName: "State University System",
};

const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    setOrganizations(state, action: PayloadAction<Organization[]>) {
      state.list = action.payload;
    },
    setCurrentOrgName(state, action: PayloadAction<string>) {
      state.currentOrgName = action.payload;
    },
  },
});

export const { setOrganizations, setCurrentOrgName } = organizationSlice.actions;
export default organizationSlice.reducer;
