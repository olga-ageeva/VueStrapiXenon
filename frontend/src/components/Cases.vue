<template>
  <section class="cases" v-if="home">
    <h2>Результаты, которые вдохновляют</h2>

    <div class="cases__grid">
      <CaseCard
        v-for="item in home.cases"
        :key="item.id"
        :image="item.image"
        :title="item.title"
        :description="item.description"
        :link_text="item.link_text"
        :link_url="item.link_url"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchData } from '@/plugins/api'
import CaseCard from './CaseCard.vue'

const home = ref(null)

onMounted(async () => {
  const res = await fetchData('/home', {
    populate: {
      cases: { populate: '*' }
    }
  })
  home.value = res.data
})
</script>

<style scoped>
.cases__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-top: 40px;
}
</style>
