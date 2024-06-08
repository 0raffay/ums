import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "@/api/Auth/authApi";
import authReducer from "@/store/slices/authSlice";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
