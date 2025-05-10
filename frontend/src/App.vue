<template>
  <AppHeader/>

  <main>
    <RouterView />
  </main>

  <footer>

    <div class="footer">
      <p>© 2023 Tech-Me. All rights reserved.</p>
      <p>Contact: <a href="mailto:tal.amit0311@gmail.com"><strong> Contact Me</strong></a></p>
      <p>Follow me on 
        <a href="
        https://www.linkedin.com/in/tal-amit-0311/" target="_blank">
        <strong>LinkedIn</strong></a>
      </p>
    </div>
      

    <GlobalLoader/>
  </footer>

</template>

<script setup>
import {onBeforeMount, computed, watchEffect ,ref} from 'vue'
import {useRouter} from 'vue-router'
import {useArticleStore} from './stores/articleStore'
import GlobalLoader from './components/GlobalLoader.vue'
import { debounce } from './services/util.service'
import AppHeader from '@/components/AppHeader.vue'
// import {loadFromStorage} from './services/util.service.js'

const articleStore = useArticleStore()
const lang = computed(( ) => articleStore.getFilterBy.lang)


onBeforeMount(() => {

  console.log('App.vue component is about to be mounted')
})



// watchEffect(() => {
//   console.log('userPrefs changed:', lang.value)
// })

// console.log('App.vue loaded')
// console.log(import.meta.env);
;

// Search logic


</script>

<style scoped></style>
