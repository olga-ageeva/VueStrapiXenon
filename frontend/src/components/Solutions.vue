<template>
  <section class="solutions" v-if="home">
    <div class="solutions__container">
      <!-- Заголовок блока -->
      <h2 class="solutions__title">Наши решения для вашего успеха</h2>
      <p class="solutions__subtitle">
        Мы предлагаем полный спектр IT-услуг, чтобы ваш бизнес работал быстрее, умнее и эффективнее.
      </p>

      <!-- Карточки -->
      <div class="solutions__cards">
        <div
          v-for="item in home.solutions"
          :key="item.id"
          class="solutions__card"
        >
          <div class="solutions__icon-wrapper">
            <img
              v-if="item.icon"
              :src="'http://localhost:1337' + item.icon.url"
              alt=""
              class="solutions__icon"
            />
          </div>

          <h3 class="solutions__card-title">{{ item.title }}</h3>
          <p class="solutions__card-desc">{{ item.description }}</p>

          <a
            :href="item.link_url || '#'"
            class="solutions__card-link"
          >
            {{ item.link_text }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchData } from '@/plugins/api'

interface SolutionCard {
  id: number
  title: string
  description: string
  link_text: string
  link_url: string | null
  icon: {
    url: string
  } | null
}

interface HomeData {
  solutions: SolutionCard[]
}

const home = ref<HomeData | null>(null)

onMounted(async () => {
  const res = await fetchData('/home', {
    populate: {
      solutions: {
        populate: '*',
      },
    },
  })

  home.value = res.data
  console.log('solutions from Strapi:', home.value?.solutions)
})
</script>

<style scoped>
.solutions {
  padding: 80px 0;
  background: #1d212b;
  color: #fff;
}

.solutions__container {
  max-width: 1200px;
  margin: 0 auto;
}

.solutions__title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 12px;
}

.solutions__subtitle {
  font-size: 18px;
  opacity: 0.8;
  margin-bottom: 32px;
}

.solutions__cards {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.solutions__card {
  border-radius: 16px;
  border: 1px solid #2f3642;
  padding: 24px;
  width: 260px;
  background: #1f2430;
}

.solutions__icon-wrapper {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
}

.solutions__icon {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.solutions__card-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.solutions__card-desc {
  font-size: 14px;
  opacity: 0.8;
  margin-bottom: 12px;
}

.solutions__card-link {
  font-size: 14px;
  color: #38bdf8;
  text-decoration: none;
}
</style>