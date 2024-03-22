<script setup lang="ts">
import { useGameStore } from '@/stores/store';

const store = useGameStore();
</script>

<template>
    <div class="fighters-wrapper">
        <div class="preview">
            <img :src="store.selectedFighter?.animatedImage" alt="Active Fighter" />
            <div class="preview__name">{{ store.selectedFighter?.name }}</div>
        </div>
        <div class="grid">
            <div
                class="grid__item"
                v-for="fighter in store.availableFighters"
                @click="() => store.selectFighter(fighter.name)"
                :class="{ active: store.selectedFighter?.name === fighter.name }"
                :key="fighter.name"
            >
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
        font-family: 'mk2', serif;
        font-weight: bold;
        flex: 1;
        text-align: right;
        font-size: 2rem;
    }
}

.grid {
    display: flex;
    flex: 1;
    align-items: center;
    padding: 0.5rem;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.45);

    &__item {
        width: calc(50% - 1rem);
        height: calc(60vh / 3 - 1.5rem);
        background-color: #ccc;
        margin: 0.5rem;
        cursor: pointer;

        &.active {
            outline: 0.5rem solid var(--mk-main-color);

            img {
                filter: brightness(120%);
            }
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: brightness(60%);
            transition: filter 0.3s ease;
            box-shadow:
                rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
                rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;

            &:hover {
                filter: brightness(100%);
            }
        }
    }
}
</style>
