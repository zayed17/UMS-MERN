import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import { adminApi } from "./admin/adminApi";  

const rootReducer = combineReducers({
 user: userReducer,
 [adminApi.reducerPath]: adminApi.reducer,
});


export const store = configureStore({
 reducer: rootReducer,
 middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adminApi.middleware),
 devTools: true,
});

export default store;   