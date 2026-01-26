import { useState } from "react";
import { api } from "../auth/api";
import { favoriteMotivationIdStore } from "./store";

export async function favoriteToggle() {
    const motivationId = favoriteMotivationIdStore.get();
    const res = await api.post(`/favorites/${motivationId}/toggle`);

    return res.data
}
