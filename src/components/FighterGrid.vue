<script setup lang="ts">
import { Fighter } from '@/common/utils/models/classes'
import { onMounted } from 'vue'

const props = defineProps({
	fighters: Array<Fighter>,
	activeFighter: Fighter
})
defineEmits<{ (event: 'fighterSelected', value: Fighter): void }>()
onMounted(() => {
	console.log(props.fighters)
})
</script>

<template>
	<div class="fighters-wrapper">
		<div class="preview">
			<img :src="props.activeFighter?.animatedImage" alt="Active Fighter">
			<div class="preview__name">{{props.activeFighter?.name}}</div>
		</div>
		<div class="grid">
			<div
				class="grid__item"
				v-for="fighter in props.fighters"
				@click="() => $emit('fighterSelected', fighter)"
				:class="{ active: props.activeFighter?.name === fighter.name }"
				:key="fighter.name">
				<img :src="fighter.staticImage" :alt="fighter.name" />
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.fighters-wrapper {
	display: flex;
	flex-direction: column;
}

.preview {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 9rem;

	&__name {
		margin-right: 1rem;
		font-family: "mk2", serif;
		font-weight: bold;
		flex: 1;
		text-align: right;
		font-size: 2rem;
	}
}

.grid {
	display: flex;
	height: 80vh;
	align-items: center;
	padding: 0.5rem;
	flex-wrap: wrap;
	justify-content: space-between;
	background-color: rgba(0, 0, 0, 0.45);

	&__item {
		width: calc(50% - 1rem);
		height: calc(80vh / 3 - 1.5rem);
		background-color: #ccc;
		margin: 0.5rem;
		cursor: pointer;

		&.active {
			outline: 0.5rem solid #28a112;
		}

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			filter: brightness(80%);
			transition: filter 0.3s ease; /* Optional: Add transition for smooth effect */
			box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;

			&:hover {
				filter: brightness(100%);
			}
		}
	}
}
</style>
