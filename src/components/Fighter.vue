<template>
	<div class="fighter-wrapper">
		<div :class="{'dead': !props.fighter?.isAlive}">
			<img :src="props.fighter?.animatedImage" :alt="fighter?.name" />
			<div>{{ props.fighter?.name }}</div>
		</div>
	</div>

</template>

<script setup lang="ts">

import { ref } from 'vue'

const hp = ref(100);

 const props = defineProps({
	 fighter: {
		 type: Object,
	 }
 })
</script>

<style scoped lang="scss">
.fighter-wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: 1rem;
	position: relative;
}

</style>
