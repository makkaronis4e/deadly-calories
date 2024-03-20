import { createRouter, createWebHistory } from 'vue-router';
import StartView from '../views/Start.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'start',
            component: StartView,
        },
        {
            path: '/config',
            name: 'config',
            component: () => import('../views/Config.vue'),
        },
    ],
});

export default router;
