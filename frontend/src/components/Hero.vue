<template>
  <section class="hero" v-if="home">
    <div class="hero__container">
      <!-- Заголовок + текст + кнопка -->
      <HeroHead
        :title="home.hero_headings.title"
        :subtitle="home.hero_headings.subtitle"
        :description="home.hero_headings.description"
        :button_text="home.hero_headings.button_text"
      />

      <!-- Карточки -->
      <div class="hero__cards">
        <HeroCard
          v-for="card in home.hero_cards"
          :key="card.id"
          :title="card.title"
          :description="card.description"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { fetchData } from '@/plugins/api'
import { ref, onMounted } from 'vue'

import HeroCard from './HeroCard.vue'
import HeroHead from './HeroHead.vue'

interface HeroCardItem {
  id: number
  title: string
  description: string
}

interface HeroHeadings {
  title: string
  subtitle: string
  description: string
  button_text: string
}

interface HeroData {
  hero_headings: HeroHeadings
  hero_cards: HeroCardItem[]
}

const home = ref<HeroData | null>(null)

onMounted(async () => {
  const result = await fetchData('/home', { populate: '*' })
  home.value = result.data
  console.log(home.value)
})
</script>

<style scoped>
.hero {
  padding: 120px 0;
  background: #1d212b;
  color: white;
}

.hero__container {
  max-width: 1200px;
  margin: 0 auto;
}

.hero__cards {
  display: flex;
  gap: 20px;
}
</style>
