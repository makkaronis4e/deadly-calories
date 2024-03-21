<template>
    <div class="config-wrapper">
        <div class="control">
            <div class="control__header">
                <img src="/img/poison.webp" alt="Poison" />
                <span>{{ $t('config.poison_chance') }}</span>
            </div>
            <v-text-field
                v-model.number="props.configForm!.poisonChance"
                hide-details
                max="0.1"
                min="0.9"
                single-line
            />
        </div>
        <div class="control">
            <div class="control__header">
                <img src="/img/hp.webp" alt="Health points" />
                <span>{{ $t('config.initial_calories') }}</span>
            </div>
            <v-text-field
                v-model.number="props.configForm!.startingCalories"
                hide-details
                :max="10"
                :min="3"
                single-line
            />
        </div>
        <div class="control">
            <div class="control__header">
                <Kanelboller size="24" />
                <span>{{ $t('config.calories_range') }}</span>
            </div>
            <v-range-slider
                v-model="props.configForm!.caloriesRange"
                max="3"
                min="0.1"
                step="0.1"
                thumb-size="10"
                class="align-center"
                thumb-label="always"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import Kanelboller from '@/components/Kanelboller.vue';

const props = defineProps({
    configForm: Object,
});
</script>

<style scoped lang="scss">
.config-wrapper {
    max-width: 600px;
}

.control {
    display: flex;
    flex-direction: column;
    margin-bottom: 3rem;

    &__header {
        margin-bottom: 1rem;
        display: flex;
        align-items: center;

        img {
            height: 24px;
        }

        span {
            margin-left: 1rem;
            font-size: 1.2rem;
        }
    }
}
</style>
