<template>
  <section class="blog-index">
    <h1>Blog Index</h1>
      <ArticleList v-if="articles" :articles="articles" />
  </section>
</template>
<script setup>
import { ref, onMounted, computed , watch, watchEffect } from 'vue'
import { useArticleStore } from '../stores/articleStore'
import ArticleList from '@/components/ArticleList.vue'


const articleStore = useArticleStore()
const articles = computed(() => articleStore.getArticles)

watchEffect(() => {
  console.log('isLoading changed', articleStore.isLoading)
})
onMounted(() => {
  articleStore.loadArticles()
 })

</script>
<style></style>
