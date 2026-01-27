import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from './slices/favoriteSlice';
import motivationReducer from './slices/motivationSlice';

export const store = configureStore({
    reducer: {
        favorites: favoriteReducer,
        motivation: motivationReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;