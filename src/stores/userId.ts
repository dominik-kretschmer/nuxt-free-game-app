export const useUserStore = defineStore('userStore', {
    state: () => ({
        userId: null as number | null
    }),

    getters: {
        getUserId: (state) => state.userId
    },

    actions: {
        setUserId(id: number) {
            this.userId = id;
        },

        clearUserId() {
            this.userId = null;
        }
    },

    persist: {
        storage: persistedState.localStorage,
        paths: ['userId']
    }
});