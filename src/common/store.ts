export const favoriteMotivationIdStore = (() => {
    let favoriteMotivationIds: number[] = [];

    return {
        get: () => favoriteMotivationIds,
        set: (t: number[] | []) => (favoriteMotivationIds = t),
    }
})();