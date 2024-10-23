import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import { userApi } from "./api/userApi";
import { authApi } from "./api/authApi";
import { jobsApi } from "./api/jobsApi";
import { applicationApi } from "./api/applicationApi";
import { companyApi } from "./api/companyApi";
import { reviewsApi } from "./api/reviewsApi";
import { analyticApi } from "./api/analyticApi";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [jobsApi.reducerPath]: jobsApi.reducer,
    [applicationApi.reducerPath]: applicationApi.reducer,
    [companyApi.reducerPath]: companyApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [analyticApi.reducerPath]: analyticApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      userApi.middleware,
      jobsApi.middleware,
      applicationApi.middleware,
      companyApi.middleware,
      reviewsApi.middleware,
      analyticApi.middleware,
    ]),
});
