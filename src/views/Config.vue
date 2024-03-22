<template>
	<form class="form-wrapper" @submit.prevent="handleSubmit">
		<div class="left-col" v-if="configForm">
			<h3 class="title">{{ $t('config.create_config') }}</h3>
			<CompetitionConfig :config-form="configForm" />
			<v-btn type="submit" class="start" size="x-large" color="var(--mk-main-color)">{{
					$t('config.serve')
				}}
			</v-btn>
		</div>
		<div class="right-col">
			<div class="fighters-grid">
				<FighterGrid />
			</div>
			<audio controls>
				<source src="/mka.mp3" type="audio/mp3">
			</audio>
		</div>
	</form>
</template>
<script setup lang="ts">
import { type Ref } from 'vue'
import FighterGrid from '@/components/FighterGrid.vue'
import CompetitionConfig from '@/components/CompetitionConfig.vue'
import { ref } from 'vue'
import { useGameStore } from '@/stores/store'
import type { GameConfig } from '@/common/utils/models/interfaces'

const configStore = useGameStore()
const configForm: Ref<GameConfig> = ref({
	caloriesRange: [0.2, 2],
	poisonChance: 0.2,
	startingCalories: 5
})

const handleSubmit = () => {
	configStore.updateConfig(configForm.value, true)
}

</script>
<style scoped lang="scss">

.form-wrapper {
	min-height: 100vh;
	display: flex;
	justify-content: center;
	padding: 2rem 1rem 1rem;

	.left-col {
		flex: 1;
		max-width: 1400px;
		margin-right: 2rem;

		.title {
			height: 9rem;
			display: flex;
			align-items: center;
			font-family: 'mk2', serif;
			font-size: 3rem;
			margin-bottom: 1rem;
			color: var(--mk-title-color);
			text-shadow: 10px 10px 25px rgb(81, 67, 21),
			-10px 10px 25px rgb(81, 67, 21),
			-10px -10px 25px rgb(81, 67, 21),
			10px -10px 25px rgb(81, 67, 21);
		}
	}

	.right-col {
		width: 24%;
		height: 100%;
		min-width: 200px;
		max-width: 400px;
		display: flex;
		flex-direction: column;

		.start {
			margin-top: 2rem;
		}
	}
}

audio {
	width: 100px;
	margin-top: 2rem;
}

audio::-webkit-media-controls-volume-slider,
audio::-webkit-media-controls-timeline-container,
audio::-webkit-media-controls-time-remaining-display,
audio::-webkit-media-controls-timeline {
	display: none !important;
}

audio::-webkit-media-controls-panel {
	padding: 0 0 0 1px;
	justify-content: center; /*control panel elements are flex positioned*/
}
</style>
