import { createRouter, createWebHistory } from 'vue-router';
import StartView from '../views/Game.vue';
import Config from '@/views/Config.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'config',
            component: Config,
        },
        {
            path: '/game',
            name: 'game',
            component: () => import('../views/Game.vue'),
        },
    ],
});

export default router;
