<template>
	<div class="wrapper">
		<div class="left-col"></div>
		<div class="right-col">
			<div class="fighters-grid">
				<FighterGrid
					v-if="selectedFighter"
					@fighter-selected="setSelectedFighter"
					:active-fighter="selectedFighter"
					:fighters="availableFighters" />
			</div>
			<button class="start">Start Game</button>
		</div>

	</div>

</template>
<script setup lang="ts">
import { onMounted, type Ref } from 'vue'
import { FIGHTERS } from '@/common/utils/constants/fighters'
import { Fighter } from '@/common/utils/models/classes'
import FighterGrid from '@/components/FighterGrid.vue'
import { ref } from 'vue';
	let availableFighters: Ref<Fighter[]> = ref([]);
	let selectedFighter: Ref<Fighter | null> = ref(null);
	let enemyFighters: Fighter[];
	onMounted(() => {
		availableFighters.value = FIGHTERS.map((fighter) => new Fighter(fighter));
		selectedFighter.value = availableFighters.value[0];
	})

 const setSelectedFighter = (fighter: Fighter) => {
	selectedFighter.value = fighter;
}
</script>
<style scoped lang="scss">
@media (min-width: 1024px) {
	.wrapper {
		min-height: 100vh;
		display: flex;
		padding: 1rem;
		background-image: url('src/assets/img/config-bg.png');
		background-repeat: repeat;

		.left-col {
			flex: 1;
		}

		.right-col {
			width: 30%;
			min-width: 400px;
		}
	}
}
</style>
