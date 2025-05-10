<template>
  <section class="article-details">
    <iframe
     ref="iframeRef"
     :src="`https://tal0311.github.io/Tech-Me/HTML/${route.params.slug}-${route.query.lang}.html`" width="100%"
      height="900" frameborder="0" style="border: none;">
    </iframe>
  </section>
</template>

<script setup>
import { ref, onMounted, watchEffect, watch } from 'vue'
import { useRoute } from 'vue-router'
import { articleService } from '@/services/article'

// import {highlightText} from '@/services/util.service.js';

const route = useRoute()
const article = ref(null)
const iframeRef = ref(null)

onMounted(async() => {
 await loadArticle()
  console.log('Route:', route.params.slug);
  console.log('Lang:', route.query.lang);


})


async function loadArticle() {
  try {
    article.value = await articleService.getById(route.params.slug)
  } catch (error) {
    console.error('Error loading article:', error)
  }

}






</script>

<style scoped>
.article-content {
  direction: rtl;
  line-height: 1.8;
  font-family: sans-serif;
}

.article-content pre {
  background: #f5f5f5;
  padding: 1rem;
  overflow-x: auto;
  border-radius: 4px;
}
</style>