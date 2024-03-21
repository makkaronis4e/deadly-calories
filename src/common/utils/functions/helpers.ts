import { Theme } from '@/common/utils/constants/shared';
import type { GameConfig } from '@/common/utils/models/interfaces'
import type { LocationQueryValue } from 'vue-router'

export const getMediaPreference = (): string => {
    const hasDarkPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return hasDarkPreference ? Theme.Dark : Theme.Light;
};

export const queryObjectToConfig = (obj: Record<string, LocationQueryValue | LocationQueryValue[]>): GameConfig => {
    // TODO add proper type guards
    const poisonChance = Number(obj.poisonChance);
    const caloriesRange = Array.isArray(obj.caloriesRange) ? obj.caloriesRange.map((calorie) => Number(calorie)) : [0.2, 2];
    const startingCalories = Number(obj.startingCalories);
    return {
        caloriesRange,
        poisonChance,
        startingCalories
    }
}


