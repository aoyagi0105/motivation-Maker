import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FavoritesState = {
    favoriteIds: number[];
    isFavored: boolean;
}

const initialState: FavoritesState = {
    favoriteIds: [],
    isFavored: false
}

const favoritesSlice = createSlice({
    name: 'favortes',
    initialState,
    reducers: {
        setFavoriteIds(state, action: PayloadAction<number[]>) {
            state.favoriteIds = action.payload;
        },
        setIsFavored(state, action: PayloadAction<boolean>) {
            state.isFavored = action.payload;
        }
    }
})

export const { setFavoriteIds, setIsFavored } = favoritesSlice.actions;
export default favoritesSlice.reducer;


