import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from './slices/favoriteSlice';
import motivationReducer from './slices/motivationSlice';
import languageReducer from './slices/languageSlice';

export const store = configureStore({
    reducer: {
        favorites: favoriteReducer,
        motivation: motivationReducer,
        language: languageReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;