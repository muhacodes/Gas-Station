import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthUser, userType } from '../../types/auth';

interface AuthState {
  user: userType;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  isRefreshingToken: Boolean;
  expire: string;
  access: string;
  refresh: string;
  access_token_expires: string;
  refresh_token_expires: string;
}

const initialState: AuthState = {
  status: 'idle',
  error: null,
  isRefreshingToken: false,
  expire: '',
  access: '',
  access_token_expires: '',
  refresh: '',
  refresh_token_expires: '',
  user: {
    id: 0,
    email: '',
    username: '',
    is_admin: false,
  },
};



export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reSet: (state) => {
      state.refresh = '';
      state.access = '';
      state.refresh_token_expires = '';
    },
    addAuth: (state, action: PayloadAction<AuthUser>) => {
      state.expire = action.payload.access_token_expires;
      state.access = action.payload.access;
      state.access_token_expires = action.payload.access_token_expires;
      state.refresh = action.payload.refresh;
      state.refresh_token_expires = action.payload.refresh_token_expires;
      state.user = action.payload.user;
      console.log(action.payload.user);
      console.log('console log......', action.payload);
    },
    updateAccessToken: (state, action) => {
      // state.list.access = action.payload;
      state.access = action.payload;
      // Optionally update the expiration time here
    },
    startTokenRefresh(state) {
      state.isRefreshingToken = true;
    },
    finishTokenRefresh(state) {
      state.isRefreshingToken = false;
    },
    updateAuthToken: (state, action) => {
      state.expire = action.payload.data.access_token_expires;
      state.access_token_expires = action.payload.access_token_expires;
      state.access = action.payload.data.access;
    },
    // Implement additional reducers as needed
  },
});

export const AuthActions = AuthSlice.actions;
export default AuthSlice.reducer;
