<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'

import { useI18n } from 'vue-i18n'
import { useTheme } from 'vuetify'
import { Language, Theme } from '@/common/utils/constants/shared'
import { getFromLocalStorage, LocalStorageToken, saveToLocalStorage } from '@/common/utils/functions/storage'
import { getMediaPreference } from '@/common/utils/functions/helpers'
import { useGameStore } from '@/stores/store'
import type { GameConfig } from '@/common/utils/models/interfaces'
import { onMounted } from 'vue'
import Kanelboller from '@/components/Kanelboller.vue'

const i18n = useI18n()
const theme = useTheme()
const langs = [Language.En, Language.No]
const version = import.meta.env.VITE_APP_VERSION || 'dev';
const store = useGameStore();
const router = useRouter();

const onLanguageChange = (lang: string) => {
	i18n.locale.value = lang
	saveToLocalStorage(LocalStorageToken.Language, lang)
}

const onThemeChange = () => {
	const isDark = theme.global.current.value.dark
	const newTheme = isDark ? Theme.Light : Theme.Dark
	theme.global.name.value = newTheme
	document.body.className = newTheme
	saveToLocalStorage(LocalStorageToken.Theme, newTheme)
}

onMounted(() => {
	store.generateFighters();
})
</script>

<template>
	<div class="page">
		<header>
			<div class="version">{{ version }}</div>
			<div class="tag">
				<div class="tag__text">{{ $t('start.deadly_calories_edition') }}</div>
				<Kanelboller size="40" />
			</div>
			<div class="page-settings">
				<div class="lang-selection">
            <span
				:class="{ active: i18n.locale.value === lang }"
				@click="onLanguageChange(lang)"
				v-for="lang in langs">{{ lang.toUpperCase() }}</span>
				</div>
				<div class="theme-selection">
					<v-icon @click="onThemeChange()">
						{{ theme.global.current.value.dark ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }}
					</v-icon>
				</div>
			</div>
		</header>
		<div v-if="store.selectedFighter">
			<RouterView />
		</div>
	</div>

</template>

<style scoped lang="scss">

.page {
	min-height: 100vh;
	background-image: url('/img/config-bg.png');
	background-repeat: repeat;
}

header {
	height: 4rem;
	width: 100%;
	z-index: 100;
	padding: 1rem 2rem 0;
	display: flex;
	justify-content: space-between;
	align-items: center;

	.tag {
		display: flex;
		align-items: center;
		padding: 4px 5rem;

		&__text {
			font-family: 'mk2', serif;
			font-weight: 500;
			margin-right: 1rem;
			color: white;
			text-shadow: 2px 2px 2px #181818;
		}
	}

	.page-settings {
		display: flex;
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
}
</style>
