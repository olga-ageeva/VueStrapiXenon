<template>
  <div class="header" v-if="responseData"> <!--"header". v-if="responseData"-директива Vue. Vue смотрит на значение переменной responseData, которая приходит из <script> и кладёт ответ из Strapi.Если responseData есть, этот <div> создаётся в DOM-->
    <!-- Левое меню -->
    <div class="menu left" v-if="responseData.menu_block?.[0]"> <!--это поле в объекте, которое пришло из Strapi (в админке у тебя как раз есть menu_block) ?.[0] — optional chaining (опциональная индексация):Vue пытается взять нулевой элемент массива menu_block[0].-->
      <a
        v-for="menuLink in responseData.menu_block[0].menu_link" 
        :key="menuLink.link_name"
        :href="menuLink.link_url"
      > <!-- v-for="... in ..." — перебор массива. menuLink — имя переменной для одного элемента массива в каждой итерации. responseData.menu_block[0].menu_link — массив ссылок внутри первого блока меню. :key — специальный атрибут для Vue, уникальный идентификатор для каждой ссылки в цикле. :href="..." — сокращение от v-bind:href="...". Значение берётся из menuLink.link_url, то есть из данных Strapi -->
        {{ menuLink.link_name }} <!--{{}} — Vue подставляет сюда значение выражения из data. menuLink.link_name — имя ссылки, которое ты ввела в Strapi: “Главная”, “О компании”, “Услуги”.-->
      </a>
    </div>

    <!-- Лого -->
    <div class="logo" v-if="responseData.logo"> <!--блок будет показываться только если в responseData есть поле logo.-->
      <img :src="'http://localhost:1337' + responseData.logo.url" alt="logo" />
    </div>

    <!-- Правое меню -->
    <div class="menu right" v-if="responseData.menu_block?.[1]"> 
      <a
        v-for="menuLink in responseData.menu_block[1].menu_link"
        :key="menuLink.link_name"
        :href="menuLink.link_url"
      > <!--Контейнер для правого меню.

class="menu right" — теперь классы menu + right — можно стилизовать правую часть отдельно.

v-if="responseData.menu_block?.[1]" — условие, аналогичное левому меню, только: Берётся второй элемент массива menu_block — [1]. То есть второй блок меню, который ты завела в Strapi (например, другие пункты: “Контакты”, “Отзывы” и т. д.). Блок правого меню есть только если Strapi вернул menu_block[1].-->
        {{ menuLink.link_name }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fetchData } from '@/plugins/api' //в проекте создала файл plugins/api.ts, в котором есть функция fetchData. Она делает HTTP-запрос к Strapi и возвращает данные.
import { onBeforeMount, ref } from 'vue' //ref — создаёт реактивную переменную (Vue будет отслеживать её изменения). onBeforeMount — хук жизненного цикла: выполняется перед тем, как компонент попадёт в DOM. Идеально подходит для загрузки данных.

interface MenuLink { //“Каждая ссылка в меню — это объект с двумя строками: link_name, link_url”
  link_name: string
  link_url: string
}

interface MenuBlock { //Этот объект содержит поле: menu_link — массив ссылок (MenuLink[]).Это соответствует Strapi:menu_block (2) внутри каждого блока → menu_link (3).
  menu_link: MenuLink[]
}

interface ResponseData { //Тип для всего ответа Strapi. menu_block — массив блоков меню (левый/правый). logo — объект с полем url
  menu_block: MenuBlock[]
  logo: {
    url: string
  }
}

const responseData = ref<ResponseData | null>(null) //Создание реактивной переменной. responseData — хранит данные, которые придут из Strapi. ref — делает переменную реактивной. <ResponseData | null> — это может быть: либо объект ResponseData, либо null (пока данные не загрузились).

const query = { //Создание объекта запроса для Strapi. populate — это параметр Strapi, который говорит: “Подставь все вложенные данные”. Ты говоришь Strapi: populate меню блоков полностью и populate логотипа полностью. Это нужно, чтобы Strapi вернул: ссылки, картинки, вложенные объекты.
  populate: {
    menu_block: {
      populate: '*',
    },
    logo: {
      populate: '*',
    },
  },
}

onBeforeMount(async () => { //Хук "перед монтированием компонента". Код внутри этого блока запустится: до того, как HTML отрендерится, но уже когда компонент готов работать с данными. Идеально для загрузки данных.
  try { //✔ Начинаем обработку запроса с защитой от ошибок
    const response = await fetchData('/header', query) //Отправка запроса к Strapi. fetchData — функция, которая делает HTTP-запрос. '/header' — URL Strapi эндпоинта Single Type “Header”. query — параметры populate. Strapi возвращает объект response.
    responseData.value = response.data //Сохраняем данные в реактивную переменную. responseData — это ref, поэтому доступ к значению → через .value. “В responseData появились данные — нужно обновить HTML”. Именно поэтому меню и логотип появляются на странице.
  } catch (error) { //Ловим ошибки запроса (если Strapi упадёт)
    console.error('Ошибка при загрузке данных:', error) //Выводим ошибку в консоль. Это появляется в DevTools, если что-то не так с сервером.
  }
})
</script>

<style scoped>
.header {
  width: 100%;
  height: 90px;
  background: var(--color-header-footer-bg);
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu {
  display: flex;
  gap: 32px;
  align-items: center;
}
.menu.left {
  margin-right: 60px;
}
.menu.right {
  margin-left: 60px;
}



.logo img {
  height: 40px;
}
</style>
