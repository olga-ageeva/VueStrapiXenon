<template>
<h1>{{icon }}</h1>
<p>{{ title }}</p>
<p>{{ description }}</p>
<button>{{ link_text }}</button>

</template>

<script setup lang="ts">
defineProps({
  icon: String,
  title: String,
  description: String,
  link_text: String,
})


</script>
<style>

</style>