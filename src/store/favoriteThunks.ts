import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../auth/api";

export const toggleFavorite = createAsyncThunk(
    'favorites/toggleFavorite',
    async (motivationId: number) => {
        const toggleResponse = await api.post('/favorites/toggle', { motivationId });
        const favoriteMotivationIds = await api.get('/favorites/favoriteMotivationIds');

        return { isFavored: toggleResponse.data, favoriteIds: favoriteMotivationIds.data };
    }
)