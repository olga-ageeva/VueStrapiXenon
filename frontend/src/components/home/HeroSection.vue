<template>
  <h1>{{ data.title }}</h1>
  <p>{{ data.subtitle }}</p>
  <p>{{ data.description }}</p>
  <button>{{ data.button_text }}</button>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  likes: Number,
})
</script>
<style></style>
