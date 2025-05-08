<template>
    <section class="article-list">
        <ul v-for="(article, index) in articles" >
            <ArticlePreview :article="article" :key="index"/>
        </ul>
    </section>
</template>

<script setup>

import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

import ArticlePreview from '@/components/ArticlePreview.vue'

const prop = defineProps({
    articles: {
        type: Array,
        required: true
    }
})


const route = useRoute();
console.log('Route:', route.query.lang);

const lang = computed(() => route.query.lang || 'en');
</script>

<style scoped></style>