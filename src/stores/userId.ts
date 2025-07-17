import { defineStore } from 'pinia'
import { extractUserIdFromToken } from '~/composables/jwtHandler'

export const useUserStore = defineStore('userStore', {
    state: () => ({
        token: null as string | null
    }),
    getters: {
        getToken: (state) => state.token,
    },

    actions: {
        setToken(token: string) {
            this.token = token;
        },

        clearToken() {
            this.token = null;
        }
    },
});
