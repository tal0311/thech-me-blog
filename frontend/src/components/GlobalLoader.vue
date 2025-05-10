<!-- components/GlobalLoader.vue -->
<template>
    <div v-if="visible" class="global-loader">
      {{ msg }}
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  
  const visible = ref(false)
  const msg = ref('')
  
  const show = (ev) => {
    // console.log('GlobalLoader show event:', ev);
    
    visible.value = true
    msg.value = ev.detail.message || 'Loading...'
  }
  const hide = () => {
    visible.value = false
  }
  
  onMounted(() => {
    window.addEventListener('loader:show', show)
    window.addEventListener('loader:hide', hide)
  })
  
  onUnmounted(() => {
    window.removeEventListener('loader:show', show)
    window.removeEventListener('loader:hide', hide)
  })
  </script>
  
  <style scoped>
  .global-loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  </style>
  