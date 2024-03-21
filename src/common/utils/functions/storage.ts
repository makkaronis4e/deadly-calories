export enum LocalStorageToken {
    Language = 'app-mk-language',
    Theme = 'app-mk-theme',
}

export const saveToLocalStorage = (key: string, value: string) => {
    window.localStorage.setItem(key, value);
};

export const getFromLocalStorage = (key: string): string | null => {
    return window.localStorage.getItem(key);
};
