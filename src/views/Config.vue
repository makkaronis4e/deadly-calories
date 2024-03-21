<template>
    <form class="wrapper" @submit.prevent="handleSubmit">
        <div class="left-col" v-if="configForm">
            <h3 class="title">Configure Game</h3>
            <CompetitionConfig :config-form="configForm" />
        </div>
        <div class="right-col">
            <div class="fighters-grid">
                <FighterGrid
                    v-if="selectedFighter"
                    @fighter-selected="setSelectedFighter"
                    :active-fighter="selectedFighter"
                    :fighters="availableFighters"
                />
            </div>
            <v-btn type="submit" class="start" size="x-large" color="#28a112">Serve Kaneboller!</v-btn>
        </div>
    </form>
</template>
<script setup lang="ts">
import { onMounted, type Ref } from 'vue';
import { FIGHTERS } from '@/common/utils/constants/fighters';
import { Fighter } from '@/common/utils/models/classes';
import FighterGrid from '@/components/FighterGrid.vue';
import CompetitionConfig from '@/components/CompetitionConfig.vue';
import { ref } from 'vue';
import { useConfigStore } from '@/stores/config';
import type { ConfigForm } from '@/common/utils/models/interfaces';
let availableFighters: Ref<Fighter[]> = ref([]);
let selectedFighter: Ref<Fighter | null> = ref(null);
const configStore = useConfigStore();
const configForm: Ref<ConfigForm> = ref({
    caloriesRange: [0.2, 2],
    poisonChance: 0.2,
    startingCalories: 5,
});
onMounted(() => {
    availableFighters.value = FIGHTERS.map((fighter) => new Fighter(fighter));
    selectedFighter.value = availableFighters.value[0];
});

const setSelectedFighter = (fighter: Fighter) => {
    selectedFighter.value = fighter;
};
const handleSubmit = (payload: Event) => {
    configStore.updateConfig(configForm.value);
};
</script>
<style scoped lang="scss">
@media (min-width: 1024px) {
    .wrapper {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        padding: 1rem;
        background-image: url('src/assets/img/config-bg.png');
        background-repeat: repeat;

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
                color: yellow;
                text-shadow:
                    10px 10px 25px rgb(81, 67, 21),
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
}
</style>
