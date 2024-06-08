import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "@/api/Auth/authApi";
import authReducer from "@/store/slices/authSlice";
import { userApi } from "@/api/User";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, userApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
