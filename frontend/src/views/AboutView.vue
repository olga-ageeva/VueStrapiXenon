<template>
  <Hero :title="responseData.Hero.title" />

</template>

<script setup lang="ts">
import Hero from '@/components/Hero.vue';
import { fetchData } from '@/plugins/api';
import { onBeforeMount, ref } from 'vue';

interface ResposeData {
  title: string;
  Hero: {
    title: string;
  }
}

const responseData = ref<ResposeData | null>(null)

onBeforeMount(async () => {
  try {
    const response = await fetchData('/about', {
      populate: "*",
      }
    );

      responseData.value = response.data
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
});
</script>