import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { api } from "../auth/api";
import { setFavoriteIds, setIsFavored } from "./slices/favoriteSlice";
import { useCallback } from "react";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useFavoriteToggle() {
    const motivationId = useAppSelector(state => state.motivation.lastMotivationId);
    const dispatch = useAppDispatch();

    const toggle = useCallback(async () => {
        const toggleResponse = await api.post('/favorites/toggle', { motivationId });
        const favoriteMotivationIds = await api.get('/favorites/favoriteMotivationIds');
        dispatch(setIsFavored(toggleResponse.data));
        dispatch(setFavoriteIds(favoriteMotivationIds.data));
    }, [dispatch, motivationId])
    return toggle;
}