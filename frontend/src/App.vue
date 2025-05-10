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
  </footer>
  <GlobalLoader/>

</template>

<script setup>
import {onBeforeMount} from 'vue'
import GlobalLoader from './components/GlobalLoader.vue'
import AppHeader from '@/components/AppHeader.vue'

onBeforeMount(() => {

  console.log('App component is about to be mounted')
})


</script>

<style scoped></style>
