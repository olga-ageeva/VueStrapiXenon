<template>
  <div class="header" v-if="responseData">


    <!-- Левое меню -->
    <div class="menu left" v-if="responseData.menu_block?.[0]">
      <a
        v-for="menuLink in responseData.menu_block[0].menu_link"
        :key="menuLink.link_name"
        :href="menuLink.link_url"
      >
        {{ menuLink.link_name }}
      </a>
    </div>

    <!-- Лого -->
    <div class="logo" v-if="responseData.logo">
      <img :src="'http://localhost:1337' + responseData.logo.url" alt="logo" />
    </div>

    <!-- Правое меню -->
    <div class="menu right" v-if="responseData.menu_block?.[1]">
      <a
        v-for="menuLink in responseData.menu_block[1].menu_link"
        :key="menuLink.link_name"
        :href="menuLink.link_url"
      >
        {{ menuLink.link_name }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fetchData } from '@/plugins/api'
import { onBeforeMount, ref } from 'vue'

interface MenuLink {
  link_name: string
  link_url: string
}

interface MenuBlock {
  menu_link: MenuLink[]
}

interface ResponseData {
  menu_block: MenuBlock[]
  logo: {
    url: string
  }
}

const responseData = ref<ResponseData | null>(null)

const query = {
  populate: {
    menu_block: {
      populate: '*',
    },
    logo: {
      populate: '*',
    },
  },
}

onBeforeMount(async () => {
  try {
    const response = await fetchData('/header', query)

    responseData.value = response.data
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error)
  }
})
</script>

<style scoped>
.header {
  width: 100%;
  height: 90px; /* как в фигме */
  background: #2d353c;
  display: flex;
  justify-content: center; /* центрируем всё */
  align-items: center;
 align-items: center;
}

/* Контейнер навигации */
.menu {
  display: flex;
  gap: 32px; /* как в Figma */
  align-items: center;

}

.menu.left {
  justify-content: flex-start;
}

  .menu.right {
  justify-content: flex-end;
}


.menu a {
  display: block; /* важно: позволяет задать точный размер */
  height: 25px; /* из Figma */
  line-height: 25px;
  font-family: 'Merriweather Sans', sans-serif;
  font-weight: 300;
  font-size: 20px;
  letter-spacing: 0.05em;
  color: #ffffff;
  text-decoration: none;
}

.menu a:hover {
  opacity: 0.7;
}

/* Лого */
.logo img {
  height: 40px;
  object-fit: contain;
}

/* Левая и правая часть */
.left {
  margin-right: 60px; /* отступ от логотипа */
}

.right {
  margin-left: 60px;
}
</style>
