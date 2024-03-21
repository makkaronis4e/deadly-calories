<template>
    <div class="config-wrapper">
        <div class="control">
            <div class="control__header">
                <img src="../assets/img/poison.webp" alt="Poison" />
                <span>Poison Chance</span>
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
                <img src="../assets/img/hp.webp" alt="Health points" />
                <span>Initial Calories Points</span>
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
                <span>Calories Range</span>
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
