<template>
  <section class="blog-index">
    <h1>Blog Index</h1>
    <!-- <pre>{{ articles }}</pre>
  <pre>{{ prefs }}</pre> -->
  
    
    <ArticleList :articles="articles" />
  </section>
</template>
<script setup>
import { ref, onMounted, computed , watch, watchEffect } from 'vue'
import { useArticleStore } from '../stores/articleStore'
import ArticleList from '@/components/ArticleList.vue'
import { useRoute } from 'vue-router'

const articleStore = useArticleStore()
const articles = computed(() => articleStore.getArticles)
const isLoading = computed(() => articleStore.getLoading)
console.log('articles:', articleStore.isLoading);


// watch(() => articleStore.isLoading, (val) => {

//   console.log('isLoading changed:', val)
// })



watchEffect(() => {
  console.log('isLoading changed', articleStore.isLoading)
})
onMounted(() => {
  
  
  articleStore.loadArticles()

  dispatchEvent(new CustomEvent('loader:show', { detail: {
    message: 'Loading articles...'
  } }))
  setTimeout(() => {
    dispatchEvent(new CustomEvent('loader:hide', { detail: {} }))
  }, 2000)
  console.log('Articles loaded:', articles.value)
 

  console.log('BlogIndex component mounted')
})



</script>
<style></style>
