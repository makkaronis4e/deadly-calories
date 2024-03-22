<template>
    <img class="kanelboller-image" :style="cookieStyle" src="/img/kanelboller.png" alt="Kanelboller" />
</template>

<script setup lang="ts">
import { onMounted, type Ref, ref } from 'vue';
const props = defineProps({
    size: {
        type: String,
        default: '20',
    },
    poisoned: {
        type: Boolean,
        default: false,
    },
    calories: {
        type: Number,
        default: 0,
    },
});

let cookieStyle: Ref<Record<string, string> | undefined> = ref();
onMounted(() => {
    cookieStyle.value = {
        '--image-height': props.size + 'px',
    };
});
</script>

<style scoped lang="scss">
.kanelboller-image {
    height: var(--image-height);
}
</style>
