<template>
	<div class="character-wrapper">
		<div class="log">
			<div class="log__title">{{props.fighter.name}} Game Logs</div>
			<div class="log__content">
				<div class="log__item" v-for="log in props.fighter.log">
					<div class="log__round">{{ $t('game.round', {num: log.round}) }}</div>
					<div class="log__events" v-for="event in log.events">
						{{ event }}
					</div>
				</div>
			</div>
		</div>
		<div :class="{'dead': !props.fighter.isAlive}" class="character">
			<img :src="props.fighter.animatedImage" :alt="fighter.name" />
			<div class="character__data">
				<span class="character__name">{{ props.fighter.name }}</span>
				<span class="character__hp">{{ props.fighter.percentageOfHealth }}</span>
			</div>
		</div>
	</div>

</template>

<script setup lang="ts">

 const props = defineProps({
	 fighter: {
		 type: Object,
		 required: true
	 }
 })
</script>

<style scoped lang="scss">

.character-wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: 1rem;
	position: relative;

	.log {
		padding: 4px;
		position: absolute;
		top: 0;
		left: -10rem;
		width: 12rem;
		height: 14rem;
		background-color: #000;
		display: none;
		overflow: auto;
		z-index: 10;
		box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;

		&__title {
			font-weight: bold;
		}

		&__events {
			font-size: 11px;
			font-family: Arial, sans-serif;
		}

		&__round {
			color: var(--mk-main-color)
		}
	}

	&:hover .log {
		display: block;
	}
}

.character {

	img {
		max-height: 140px;
	}

	&__name {
		margin-right: 1rem;
	}
}

</style>
