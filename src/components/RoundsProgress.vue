<template>
    <div class="rounds">
        <div class="rounds__title">{{ $t('game.rounds') }}</div>
        <div
            @click="emit('reset', round.num)"
            class="rounds__item"
            :class="{ finished: round.finished }"
            v-for="round in rounds"
            :key="round.num"
        >
            {{ round.num + 1 }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { Round } from '@/common/utils/models/classes';

defineProps({
    rounds: {
        type: Array<Round>,
    },
});

const emit = defineEmits<{ reset: [round: number] }>();
</script>

<style scoped lang="scss">
.rounds {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;

    &__title {
        grid-column: 1 / -1;
        text-align: center;
        font-size: 1.5rem;
    }

    &__item {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 4rem;
        height: 4rem;
        background-color: rgba(255, 255, 255, 0.4);
        box-shadow:
            rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
            rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;

        &.finished {
            background-color: var(--mk-main-color);
        }

        &:hover {
            background-color: rgba(255, 255, 255, 0.6);
        }
    }
}
</style>
