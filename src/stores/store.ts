import { defineStore } from 'pinia';
import type { GameConfig } from '@/common/utils/models/interfaces';
import { useRouter } from 'vue-router'
import { FIGHTERS } from '@/common/utils/constants/fighters'
import { CookieBuilder, Fighter, Round } from '@/common/utils/models/classes'
export const useGameStore = defineStore('config', {
    state: () => ({
        availableFighters: [] as Fighter[],
        selectedFighter: undefined as Fighter | undefined,
        cookieBuilder: new CookieBuilder(),
        config: {
            caloriesRange: [0.2, 2],
            poisonChance: 0.2,
            startingCalories: 5,
        },
        rounds: [] as Round[],
        activeRound: 0,
    }),
    getters: {
        aliveFighters: (state) => state.availableFighters.filter((fighter) => fighter.isAlive) as Fighter[],
    },
    actions: {
        generateFighters() {
            this.availableFighters = FIGHTERS.map((fighter) => new Fighter(fighter));
            this.selectedFighter = this.availableFighters[0];
        },
        selectFighter(fighterName: string) {
            this.selectedFighter = this.availableFighters.find((fighter) => fighter.name === fighterName);
        },
        updateConfig(payload: GameConfig, navigate?: boolean) {
            this.config = payload;
            this.cookieBuilder = new CookieBuilder(this.config.poisonChance, this.config.caloriesRange);

            if (navigate) {
                this.router.push({ path: '/game', query: { ...this.config } });
            }
        },
        generateNewRound() {
            console.log(this.rounds)
            this.rounds.push(new Round(this.rounds.length, this.availableFighters.map((fighter) => fighter.cloneSelf())));
            this.activeRound = this.rounds.length;
        }
    },
});
