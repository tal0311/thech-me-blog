<template>
  <!-- <div class="article-content" v-html="html"></div> -->

  <iframe src="https://tal0311.github.io/Tech-Me/HTML/rate-limiter.html" width="100%" height="900" frameborder="0"
    style="border: none;"></iframe>

</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  url: String
})



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