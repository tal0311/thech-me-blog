import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import BlogIndex from '@/views/BlogIndex.vue'

import { loadFromStorage } from '@/services/util.service'
import { useArticleStore } from '@/stores/articleStore'
import { articleService } from '@/services/article'


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
      name: 'article-index',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: BlogIndex
      // component: () => import('../views/BlogIndex.vue'),
    },
    {
      path: '/article/:slug',
      name: 'article-details',
      component: () => import('../views/ArticleDetails.vue'),
    }
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

  const defaultFilter = articleService.getDefaultFilter()
  const articleStore = useArticleStore()

  console.log('router beforeEach', to.name, from.name, to.query, from.query);

  const searchPaths = ['article-index']
  if (searchPaths.includes(to.name)) {
    articleStore.loadArticles({ ...defaultFilter, ...to.query, lang: to.query.lang || 'he' })
  }

  next()

})


export default router
