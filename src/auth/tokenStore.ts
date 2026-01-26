export const tokenStore = (() => {
    let accessToken: string | null = null;

    return {
        get: () => accessToken,
        set: (t: string | null) => (accessToken = t),
    }
})();