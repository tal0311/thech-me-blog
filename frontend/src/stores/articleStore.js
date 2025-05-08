import { ref, computed, watchEffect } from 'vue'
import { defineStore } from 'pinia'
import { articleService } from '@/services/article'
import { loadFromStorage } from '@/services/util.service'


export const useArticleStore = defineStore('article', () => {

  const articles = ref(null)
  const filterBy = ref({ ...articleService.getDefaultFilter() })
  const isLoading = ref(false)
  const isError = ref(false)
  const errorMsg = ref('')

  const getLoading = computed(() => {
    if (!isLoading.value) return false
    return isLoading.value
  }
  )

  const getFilterBy = computed(() => {
    if (!filterBy.value) return {}
    return filterBy.value
  }
  )


  const getArticles = computed(() => {
    if (!articles.value) return []
    return articles.value
  }
  )
  function getArticleById(articleId) {
    return articles.value.find((article) => article._id === articleId)
  }

  watchEffect(() => {
    if(isLoading.value){
      dispatchEvent(new CustomEvent('loader:show', { detail: {
        message: 'Loading articles...'
      } }))
    }
    if(!isLoading.value){
      dispatchEvent(new CustomEvent('loader:hide'))
    }
  })


  async function loadArticles() {

    isLoading.value = true
    isError.value = false
    errorMsg.value = ''



    try {
      const articlesFromService = await articleService.query(JSON.parse(JSON.stringify(filterBy.value)))
      articles.value = articlesFromService
      } catch (err) {
      isError.value = true
      errorMsg.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  return { getArticleById, loadArticles, getArticles, getFilterBy, getLoading, isError, errorMsg }
})
