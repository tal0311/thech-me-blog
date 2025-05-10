<template>
  <section class="blog-index">
    <h1>Blog Index</h1>
      <ArticleList v-if="articles && articles.length" :articles="articles" />
      <div v-else>
        <h2>No articles found that match your Search</h2>
      </div>
  </section>
</template>
<script setup>
import {computed } from 'vue'
import { useArticleStore } from '../stores/articleStore'
import ArticleList from '@/components/ArticleList.vue'

const articleStore = useArticleStore()
const articles = computed(() => articleStore.getArticles)

</script>
<style scoped>
</style>
