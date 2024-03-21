<template>
    <div class="wrapper" @click="handleEvent">
        <div class="tag">
            <div class="tag__text">{{ $t('start.deadly_calories_edition') }}</div>
            <Kanelboller size="40" />
        </div>
    </div>
</template>

<script setup lang="ts">
import Kanelboller from '@/components/Kanelboller.vue';
import { onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const handleEvent = () => {
    router.push('/config');
};

onMounted(() => {
    document.addEventListener('keydown', handleEvent);
});

onUnmounted(() => {
    document.removeEventListener('keydown', handleEvent);
});
</script>

<style scoped lang="scss">
.wrapper {
    height: 100vh;
    background: url('../assets/img/welcome_bg.webp') no-repeat center;
    background-size: cover;
    position: relative;
    cursor: pointer;
}

.tag {
    position: fixed;
    right: -6rem;
    top: 5rem;
    display: flex;
    align-items: center;
    background-color: var(--mk-main-color);
    padding: 4px 5rem;
    transform: rotate(45deg);

    &__text {
        font-family: 'mk2', serif;
        font-weight: 500;
        margin-right: 1rem;
        color: white;
        text-shadow: 2px 2px 2px #181818;
    }
}
</style>
