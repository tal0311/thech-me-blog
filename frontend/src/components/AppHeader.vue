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

      <form class="app-search" @submit.prevent="">
        <input type="text" @input="onSearch" v-model="searchTerm" placeholder="Search anything..." />
        <!-- <button type="submit">Search</button> -->
      </form>
    </nav>
  </header>
</template>

<script setup>


import { RouterLink, useRoute} from 'vue-router'
import { ref, watchEffect } from 'vue'
import { debounce } from '../services/util.service'
import { useRouter } from 'vue-router'


function signToMailLIst(){
  console.log('Sign to mail list clicked')
  // Add your logic here
}

const router = useRouter()
const route = useRoute()
const onSearch= debounce(onUserSearch, 500)
const searchTerm = ref('')
function onUserSearch() {
  router.push({  query: { ...route.query,q: searchTerm.value  } })
}


// watchEffect(() => {

//     if(route.path === '')
//   console.log('Search term changed:',route.query)
//   // Perform any additional actions when the search term changes
// })

</script>

<style scoped></style>