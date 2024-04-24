import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { adminApi } from "./admin/adminApi";  

const rootReducer = combineReducers({
 user: userReducer,
 [adminApi.reducerPath]: adminApi.reducer,
});

const persistConfig = {
 key: "root",
 version: 1,
 storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
 reducer: persistedReducer,
 middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adminApi.middleware),
});

export const persistor = persistStore(store);
