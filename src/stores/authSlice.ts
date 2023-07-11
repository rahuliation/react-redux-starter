import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { authApi } from '@/services/auth'
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { User } from '@/types/User';

interface IAuthState {
  refreshToken: null | string;
  token: string | null;
  user: null | Partial<User>;
}

const initialState: IAuthState = {
  refreshToken: null,
  token: null,
  user: null,
};

const authSlice = createSlice({
  extraReducers: (builder) => {
    builder;
    // .addMatcher(authApi.endpoints.login.matchPending, (_state, action) => {
    //   console.log('pending', action)
    // })
    // .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
    //   // console.log('done', action.payload)

    //   state.user = action.payload.data.authUser
    //   state.token = action.payload.data.token
    // })
    // .addMatcher(authApi.endpoints.login.matchRejected, (state, action) => {
    //   // console.log('rejected', action)
    // })
  },
  initialState,
  name: 'auth',
  reducers: {
    logout: () => initialState,
    setAuthData(state, action: PayloadAction<Pick<IAuthState, 'token' | 'refreshToken' | 'user'>>) {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
    },
  },
});

const persistedAuthReducer = persistReducer(
  {
    key: 'auth',
    storage,
    whitelist: ['token'],
  },
  authSlice.reducer,
);

export const { logout, setAuthData } = authSlice.actions;
export default persistedAuthReducer;

// export const selectIsAuthenticated = (state: RootState) =>
//   state.auth.isAuthenticated
