<template>
    <li  class="article-preview" :style="getStyleByDir">
        <!-- <pre>{{ props.article }}</pre> -->
         
        <h2 @click="navigateTo">{{ props.article.title[lang] }}</h2>
        <p>{{ props.article.description[lang] }}</p>
        <div class="article-meta">

            <date>{{ i18('publishedAt') }}: {{ convertDate(props.article.publishedAt) }}</date><br>
            <span v-if="props.article.author">{{ i18('author') }}: {{ props.article.author.name }}</span><br>
            <small v-if="props.article.tags[lang]">{{props.article.tags[lang].map(tag => `#${tag}`).join(', ')}}</small>
        </div>

        <section>
            <h4>{{ i18('comments') }}</h4>
            <span> {{ i18('totalComments') }}: {{ props.article.totalComments }}</span> |
            <span>{{ i18('approvedComments') }}: {{ Math.abs(props.article.approvedComments -
                props.article.totalComments)}}</span>
        </section>

    </li>

    <!-- get totalComments, title,description,publishedAt,slug, approvedComments, author ,tags-->


</template>

<script setup>
import { ref, computed, onMounted, h } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { i18nService } from '@/services/i18.service';




const props = defineProps({
    article: {
        type: Object,
        required: true
    }
})

const route = useRoute();
const lang = ref(route.query.lang || 'en');
onMounted(()=> {
    // highlightQueryText(route.query.q)
   
    // highlightText(route.query.q)
})



function i18(key) {
    return i18nService.getTrans(key, lang.value);
}
const getStyleByDir = computed(() => {
    return {
        direction: lang.value === 'he' ? 'rtl' : 'ltr',
        textAlign: lang.value === 'he' ? 'right' : 'left'
    }
})
function convertDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(lang.value, options);
}

const router = useRouter();
function navigateTo() {
  
    const slug = props.article.slug;
    const lang = route.query.lang || 'en';
    router.push({ name: 'article-details', params: { slug }, query: { ...route.query } });
}

// const publishedAt = "2025-05-01T20:33:37.000Z";
// const humanReadableDateTime = convertDate(publishedAt) + ' ' + new Date(publishedAt).toLocaleTimeString();
// console.log(humanReadableDateTime);

</script>



<style scoped>
.article-preview {
    border: 1px solid #ddd;
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
}

.article-preview h2 {
    margin: 0 0 8px;
    font-size: 1.5em;
}

.article-preview p {
    margin: 0 0 12px;
    color: #555;
}

.article-meta {
    font-size: 0.9em;
    color: #888;
}
</style>