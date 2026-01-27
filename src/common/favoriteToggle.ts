import { api } from "../auth/api";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setIsFavored } from "../store/slices/favoriteSlice";

export async function favoriteToggle() {
    const motivationId = useAppSelector(state => state.motivation.lastMotivationId);
    const dispatch = useAppDispatch();
    const res = await api.post('/favorites/toggle', { motivationId });
    dispatch(setIsFavored(res.data));

    return res.data
}
