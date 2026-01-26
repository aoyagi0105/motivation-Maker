export const lastMotivationIdStore = (() => {
    let lastMotivationId: number = 0;

    return {
        get: () => lastMotivationId,
        set: (t: number | null) => (lastMotivationId = t),
    }
})();