<template>
  <div class="hero__card">
    <!--Блок, содержащий все карточки.-->
    <h3 class="hero__card-title">{{ title }}</h3>
    <!--Отображает заголовок карточки.-->
    <p class="hero__card-desc">{{ description }}</p>
    <!--Отображает текст карточки.-->
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})
</script>

<style>

.hero__card {
  /*Сама карточка */
  padding: 25px;
  border-radius: 15px;
  background: linear-gradient(135deg, #2a303c, #1d212b);
  width: 260px;
}

.hero__card-title {
  /*Заголовок карточки */
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
}

.hero__card-desc {
  /*Описание карточки */
  opacity: 0.7;
  font-size: 16px;
}
</style>
