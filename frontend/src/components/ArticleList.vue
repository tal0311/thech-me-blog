<template>
    <div>
        <ul>
            <li v-for="article in articles" :key="article._id">
                {{ article.title[lang] }}
                <!-- {{ article.title}} -->
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref ,computed } from 'vue';
import { useRoute } from 'vue-router';
   

    const prop= defineProps({
        articles: {
            type: Array,
            required: true
        }
    })
  

    const route = useRoute();
    console.log('Route:', route.query.lang);
    
    const lang = computed(() => route.query.lang || 'en');
</script>

<style scoped>

</style>