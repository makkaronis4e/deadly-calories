import { Theme } from '@/common/utils/constants/shared';

export const getMediaPreference = (): string => {
    const hasDarkPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return hasDarkPreference ? Theme.Dark : Theme.Light;
};
