<script setup lang="ts">
import { RouterView } from 'vue-router';

import { useI18n } from 'vue-i18n';
import { useTheme } from 'vuetify';
import { Language, Theme } from '@/common/utils/constants/shared';
import { getFromLocalStorage, LocalStorageToken, saveToLocalStorage } from '@/common/utils/functions/storage';
import { getMediaPreference } from '@/common/utils/functions/helpers';

const i18n = useI18n();
const theme = useTheme();
const langs = [Language.En, Language.No];

const onLanguageChange = (lang: string) => {
    i18n.locale.value = lang;
    saveToLocalStorage(LocalStorageToken.Language, lang);
};

const onThemeChange = () => {
    const isDark = theme.global.current.value.dark;
    const newTheme = isDark ? Theme.Light : Theme.Dark;
    theme.global.name.value = newTheme;
    document.body.className = newTheme;
    saveToLocalStorage(LocalStorageToken.Theme, newTheme);
};
</script>

<template>
    <header>
        <div class="lang-selection">
            <span
                :class="{ active: i18n.locale.value === lang }"
                @click="onLanguageChange(lang)"
                v-for="lang in langs"
                >{{ lang.toUpperCase() }}</span
            >
        </div>
        <div class="theme-selection">
            <v-icon @click="onThemeChange()">
                {{ theme.global.current.value.dark ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }}
            </v-icon>
        </div>
    </header>
    <RouterView />
</template>

<style scoped lang="scss">
header {
    height: 2rem;
    width: 100%;
	z-index: 100;
    position: fixed;
    padding: 1rem 2rem 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .lang-selection {
        margin-right: 2rem;

        span {
            margin-right: 1rem;
            font-size: 1.2rem;
            cursor: pointer;

            &.active {
                color: yellow;
            }
        }
    }

    v-icon {
        cursor: pointer;
    }
}
</style>