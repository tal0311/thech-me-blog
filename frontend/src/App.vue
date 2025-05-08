<template>
  <header>
    <nav>
      <ul>
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink :to="`/about?lang=${lang}`">About</RouterLink></li>
        <li><RouterLink :to="`/article?lang=${lang}`">Articles</RouterLink></li>
        <li><RouterLink to="/contact">Contact</RouterLink></li>
        <li @click="signToMailLIst">Sign to mail list</li>
      </ul>
    </nav>
  </header>

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
import {onBeforeMount, computed, watchEffect} from 'vue'
import {useArticleStore} from './stores/articleStore'
import GlobalLoader from './components/GlobalLoader.vue'
// import {loadFromStorage} from './services/util.service.js'

const articleStore = useArticleStore()
const lang = computed(( ) => articleStore.getFilterBy.lang)


onBeforeMount(() => {

  console.log('App.vue component is about to be mounted')
})

function signToMailLIst(){
  console.log('Sign to mail list clicked')
  // Add your logic here
}

watchEffect(() => {
  console.log('userPrefs changed:', lang.value)
})

// console.log('App.vue loaded')
// console.log(import.meta.env);
;


</script>

<style scoped></style>
