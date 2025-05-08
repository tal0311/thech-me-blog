import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import BlogIndex from '@/views/BlogIndex.vue'

import { loadFromStorage } from '@/services/util.service'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/article',
      name: 'article',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component:BlogIndex
      // component: () => import('../views/BlogIndex.vue'),
    },
  ],

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },


})

router.beforeEach((to, from, next) => {
  // to.query.lang = loadFromStorage('lang') || 'he'

  console.log('router', to, from);
  

  next()

})


export default router
