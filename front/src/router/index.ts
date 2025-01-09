import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Welcome',
    component: null,
  },
  {
    path: '/shortened-links',
    name: 'ShortenedLinks',
    component: () => import('@features/shortened-link/ShortenedLinksPage.vue'),
  },
  {
    path: '/analytics/:shortUrl',
    name: 'Analytics',
    component: () => import('@features/analytics/AnalyticsPage.vue'),
    props: true,
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('@views/NotFoundPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
