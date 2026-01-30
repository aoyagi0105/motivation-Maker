import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toggleFavorite } from "../favoriteThunks";

type FavoritesState = {
    favoriteIds: number[];
    isFavored: boolean;
    favoriteCount: number;
}

const initialState: FavoritesState = {
    favoriteIds: [],
    isFavored: false,
    favoriteCount: 0,
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
        },
        setFavoriteCount(state, action: PayloadAction<number>) {
            state.favoriteCount = action.payload
        },
        clearFavorite(state) {
            state.favoriteIds = [];
            state.isFavored = false;
            state.favoriteCount = 0;
        }
    },
    extraReducers(builder) {
        builder.addCase(toggleFavorite.fulfilled, (state, action) => {
            state.isFavored = action.payload.isFavored;
            state.favoriteIds = action.payload.favoriteIds;
        })
    },
})

export const { setFavoriteIds, setIsFavored, setFavoriteCount, clearFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;


