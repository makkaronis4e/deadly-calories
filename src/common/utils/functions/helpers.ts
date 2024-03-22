import { Theme } from '@/common/utils/constants/shared';
import type { FighterLog, GameConfig } from '@/common/utils/models/interfaces'
import type { LocationQueryValue } from 'vue-router';

export const getMediaPreference = (): string => {
    const hasDarkPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return hasDarkPreference ? Theme.Dark : Theme.Light;
};

export const queryObjectToConfig = (obj: Record<string, LocationQueryValue | LocationQueryValue[]>): GameConfig => {
    // TODO add proper type guards
    const poisonChance = Number(obj.poisonChance);
    const caloriesRange = Array.isArray(obj.caloriesRange)
        ? obj.caloriesRange.map((calorie) => Number(calorie))
        : [0.2, 2];
    const startingCalories = Number(obj.startingCalories);
    return {
        caloriesRange,
        poisonChance,
        startingCalories,
    };
};

export const downloadFile = (filename: string, data: any[]) => {
    let csvContent = 'data:text/csv;charset=utf-8,';

    // Add headers
    csvContent += 'Entity,Round,Event\n';

    // Add data
    data.forEach((entity) => {
        entity.log.forEach((log: FighterLog) => {
            csvContent += `${entity.name},${log.round},"${log.events.join('; ')}"\n`;
        });
    });

    // Create a link element and trigger the download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link); // Required for Firefox
    link.click();
};
