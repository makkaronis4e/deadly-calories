<template>
    <div class="wrapper">
        <div class="header">
            <v-btn
                :disabled="roundInProgress || store.aliveFighters.length < 2"
                @click="startRound()"
                size="x-large"
                color="var(--mk-main-color)"
                >{{ $t('game.start') }}
            </v-btn>
            <div class="right-buttons">
                <v-btn to="/" variant="outlined" size="x-large">{{ $t('game.back') }} </v-btn>
                <v-btn :disabled="store.rounds.length === 0" @click="exportData()" size="x-large"
                    >{{ $t('game.download') }}
                </v-btn>
            </div>
        </div>
        <div class="content">
            <div class="left-col">
                <div class="rounds-wrapper">
                    <RoundsProgress @reset="store.resetToRound" :rounds="store.rounds as Round[]" />
                </div>
            </div>
            <div class="arena">
                <div class="fighter" :id="fighter.name" v-for="fighter of store.availableFighters">
                    <Fighter :fighter="fighter" />
                </div>
                <div class="cookie" :key="cookie.id" v-for="cookie of cookies">
                    <Kanelboller size="24" :poisoned="cookie.poisoned" :calories="cookie.calories" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, type Ref, ref, toRaw } from 'vue'
import { useRoute } from 'vue-router';
import { useGameStore } from '@/stores/store';
import Kanelboller from '@/components/Kanelboller.vue';
import { type Cookie, Round } from '@/common/utils/models/classes';
import { downloadFile, queryObjectToConfig } from '@/common/utils/functions/helpers';
import Fighter from '@/components/Fighter.vue';
import RoundsProgress from '@/components/RoundsProgress.vue';

const route = useRoute();
const store = useGameStore();
const cookies: Ref<Cookie[]> = ref([]);
const roundInProgress: Ref<boolean> = ref(false);
onMounted(() => {
    store.updateConfig(queryObjectToConfig(route.query));
});

const exportData = () => {
	downloadFile('Game_logs', [...toRaw(store.availableFighters)]);
};

const startRound = () => {
    const aliveFighters = store.aliveFighters;
    if (aliveFighters.length < 2) {
        return;
    }
    roundInProgress.value = true;
    store.generateNewRound();
    cookies.value = aliveFighters.map(() => {
        return store.cookieBuilder.bake();
    });
    setTimeout(() => {
        const kanelbollers = Array.from(document.querySelectorAll('.cookie')) as HTMLElement[];

        store.aliveFighters.forEach((fighter, index) => {
            const cookie = kanelbollers[index];
            const fighterRef = document.getElementById(fighter.name) as HTMLElement;

            const targetPosition = fighterRef.getBoundingClientRect();
            const movingItemPosition = cookie.getBoundingClientRect();

            const deltaX = targetPosition.left - movingItemPosition.left;
            const deltaY = targetPosition.top - movingItemPosition.top;

            cookie.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

            setTimeout(() => {
                cookie.remove();
                fighter.eat(cookies.value[index]);
                store.finishRound();
                roundInProgress.value = false;
            }, 1000);
        });
    }, 100);
};
</script>

<style lang="scss">
.wrapper {
    height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
}

.header {
    display: flex;
    justify-content: space-between;
    padding: 1rem;

    .right-buttons {
        .v-btn {
            margin-right: 1rem;
        }
    }
}

.content {
    padding: 1rem;
    flex: 1;
    display: flex;
    justify-content: space-between;
}

.left-col {
    width: 20rem;

    v-btn {
        margin-top: 1rem;
    }
}

.arena {
    position: relative;
    flex: 1;
    width: 400px;
    height: 400px;
    border-radius: 50%;
}

.fighter {
    border-radius: 50%;
    position: absolute;

    &.dead {
        filter: grayscale(100%);
    }

    &:nth-child(1) {
        top: calc(50% - 200px);
        left: 50%;
    }

    &:nth-child(2) {
        top: calc(50% - 200px * cos(60deg));
        left: calc(50% + 300px * sin(60deg));
    }

    &:nth-child(3) {
        top: calc(50% - 200px * cos(120deg));
        left: calc(50% + 300px * sin(120deg));
    }

    &:nth-child(4) {
        top: calc(50% + 200px);
        left: 50%;
    }

    &:nth-child(5) {
        top: calc(50% - 200px * cos(240deg));
        left: calc(50% + 300px * sin(240deg));
    }

    &:nth-child(6) {
        top: calc(50% - 200px * cos(300deg));
        left: calc(50% + 300px * sin(300deg));
    }
}

.cookie {
    position: absolute;
    z-index: 1000;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 1s ease;
}
</style>
