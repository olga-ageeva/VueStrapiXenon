<template>
  <div class="hero__head">
    <h1 class="hero__title">{{ title }}</h1>
    <p class="hero__subtitle">{{ subtitle }}</p>
    <p class="hero__description">{{ description }}</p>
    <button class="hero__button"> {{ button_text }}</button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  subtitle: string
  description: string
  button_text: string
}>()
</script>

<style scoped>
.hero__head {
  max-width: 650px;
}

.hero__title {
  font-size: 52px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 25px;
}

.hero__subtitle {
  font-size: 20px;
  opacity: 0.8;
  max-width: 600px;
  margin-bottom: 20px;
}

.hero__description {
  font-size: 18px;
  opacity: 0.7;
  max-width: 550px;
  margin-bottom: 40px;
}

.hero__button {
  background: #f97316;
  padding: 18px 32px;
  border-radius: 10px;
  font-size: 18px;
  border: none;
  cursor: pointer;
  margin-bottom: 60px;
}
</style>