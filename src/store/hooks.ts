import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { api } from "../auth/api";
import { setIsFavored } from "./slices/favoriteSlice";
import { useCallback } from "react";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useFavoriteToggle() {
    const motivationId = useAppSelector(state => state.motivation.lastMotivationId);
    const dispatch = useAppDispatch();

    const toggle = useCallback(async () => {
        const res = await api.post('/favorites/toggle', { motivationId });
        dispatch(setIsFavored(res.data));
    }, [dispatch, motivationId])

    return toggle;
}