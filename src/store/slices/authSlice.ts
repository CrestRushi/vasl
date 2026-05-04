import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthSession, AuthUser, LoginCredentials, RegisterPayload } from "@/types/auth";
import type { Role } from "@/types/role";
import { authService } from "@/services/auth.service";
import {
  AUTH_ROLE_KEY,
  AUTH_TOKEN_KEY,
  AUTH_USER_JSON_KEY,
  AUTH_USER_NAME_KEY,
} from "@/constants/storage";
import { deleteClientCookie, setClientCookie } from "@/utils/cookies";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  impersonationLabel: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
  impersonationLabel: null,
};

function persistSession(session: AuthSession) {
  setClientCookie(AUTH_TOKEN_KEY, session.token, COOKIE_MAX_AGE);
  setClientCookie(AUTH_ROLE_KEY, session.user.role, COOKIE_MAX_AGE);
  setClientCookie(
    AUTH_USER_NAME_KEY,
    `${session.user.firstName} ${session.user.lastName}`.trim(),
    COOKIE_MAX_AGE
  );
  setClientCookie(AUTH_USER_JSON_KEY, JSON.stringify(session.user), COOKIE_MAX_AGE);
}

function clearPersisted() {
  deleteClientCookie(AUTH_TOKEN_KEY);
  deleteClientCookie(AUTH_ROLE_KEY);
  deleteClientCookie(AUTH_USER_NAME_KEY);
  deleteClientCookie(AUTH_USER_JSON_KEY);
}

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      return await authService.login(credentials);
    } catch (e) {
      return rejectWithValue(e instanceof Error ? e.message : "Login failed");
    }
  }
);

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (payload: RegisterPayload, { rejectWithValue }) => {
    try {
      return await authService.register(payload);
    } catch (e) {
      return rejectWithValue(e instanceof Error ? e.message : "Registration failed");
    }
  }
);

export const switchRoleThunk = createAsyncThunk(
  "auth/switchRole",
  async (
    { role, baseEmail }: { role: Role; baseEmail?: string },
    { rejectWithValue }
  ) => {
    try {
      return await authService.switchRole(role, baseEmail);
    } catch (e) {
      return rejectWithValue(e instanceof Error ? e.message : "Switch failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
      state.impersonationLabel = null;
      clearPersisted();
    },
    hydrateFromStorage(
      state,
      action: PayloadAction<{ user: AuthUser; token: string } | null>
    ) {
      if (action.payload) {
        state.user = action.payload.user;
        state.token = action.payload.token;
      }
    },
    setImpersonation(state, action: PayloadAction<string | null>) {
      state.impersonationLabel = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginThunk.pending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(loginThunk.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.user = a.payload.user;
        s.token = a.payload.token;
        persistSession(a.payload);
      })
      .addCase(loginThunk.rejected, (s, a) => {
        s.status = "failed";
        s.error = (a.payload as string) ?? "Login failed";
      })
      .addCase(registerThunk.pending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(registerThunk.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.user = a.payload.user;
        s.token = a.payload.token;
        persistSession(a.payload);
      })
      .addCase(registerThunk.rejected, (s, a) => {
        s.status = "failed";
        s.error = (a.payload as string) ?? "Registration failed";
      })
      .addCase(switchRoleThunk.fulfilled, (s, a) => {
        s.user = a.payload.user;
        s.token = a.payload.token;
        persistSession(a.payload);
      });
  },
});

export const { logout, hydrateFromStorage, setImpersonation, clearError } = authSlice.actions;
export default authSlice.reducer;
