<template>
  <div class="case">
    <img :src="'http://localhost:1337' + image.url" class="case__img" />

    <h3 class="case__title">{{ title }}</h3>
    <p class="case__text">{{ description }}</p>

    <a :href="link_url" class="case__link">{{ link_text }}</a>
  </div>
</template>

<script setup>
defineProps({
  image: Object,
  title: String,
  description: String,
  link_text: String,
  link_url: String
})
</script>

<style scoped>
.case {
  background: linear-gradient(135deg, #2a303c, #1d212b);
  padding: 24px;
  border-radius: 20px;
  width: 420px;
}

.case__img {
  width: 100%;
  height: 160px;
  background: #444;
  border-radius: 12px;
  margin-bottom: 15px;
}

.case__title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
}
.case__text {
  opacity: 0.7;
  margin-bottom: 12px;
}
.case__link {
  color: #f97316;
  font-weight: 600;
}
</style>
