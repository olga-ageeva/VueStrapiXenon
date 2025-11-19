<template>
  <div id="app">
    <Header />
    <RouterView />
    </div>
</template>



<script setup lang="ts">
import Header from '@/components/Header.vue'
</script>


<style>
body {
  margin: 0;
  background-color: #1e1f23;
  font-family: 'Inter', sans-serif;
}
</style>
