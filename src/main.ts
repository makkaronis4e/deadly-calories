import './assets/styles/main.css';
import './assets/styles/fonts.css';
import 'vuetify/styles';
import no from './i18n/no.json';
import en from './i18n/en.json';

import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import { createApp } from 'vue';
import { markRaw } from 'vue'
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';

import App from './App.vue';
import router from './router';
import { Language, Theme } from '@/common/utils/constants/shared';
import { getFromLocalStorage, LocalStorageToken } from '@/common/utils/functions/storage';
import { getMediaPreference } from '@/common/utils/functions/helpers';
import type { Router } from 'vue-router'

declare module 'pinia' {
    export interface Pinia {
        router: () => Router
    }
    export interface PiniaCustomProperties {
        router: Router
    }
}

const app = createApp(App);

const lang = getFromLocalStorage(LocalStorageToken.Language) || Language.En;
const theme = (getFromLocalStorage(LocalStorageToken.Theme) as Theme) || getMediaPreference();
document.body.className = theme;
const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: theme,
    },
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
});

// configure i18n
const i18n = createI18n({
    legacy: false,
    locale: lang as string,
    fallbackLocale: Language.En,
    messages: { en, no },
});

const pinia = createPinia();

pinia.use(({ store }) => {
    store.router = markRaw(router)
});
pinia.router = (): Router => router;

app.use(i18n);
app.use(router);
app.use(vuetify);
app.use(pinia);

app.mount('#app');
