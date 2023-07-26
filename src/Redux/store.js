
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import rootReducer from "./reducers"; 

// Configuration for Redux Persist
const persistConfig = {
  key: "root", // The key in which the persisted state will be stored in the storage 
  storage, // The storage engine to be used for persisting the state (localStorage in this case)
};

// Creating a persisted reducer using Redux Persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuring the Redux store with the persisted reducer and other options
const store = configureStore({
  reducer: persistedReducer, // Using the persisted reducer in the store
});

export default store;
