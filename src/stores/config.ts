import { defineStore } from 'pinia';
import type { ConfigForm } from '@/common/utils/models/interfaces';

export const useConfigStore = defineStore('config', {
    state: () => ({
        config: {
            caloriesRange: [0.2, 2],
            poisonChance: 0.2,
            startingCalories: 5,
        },
    }),
    actions: {
        updateConfig(payload: ConfigForm) {
            this.config = payload;
        },
    },
});
