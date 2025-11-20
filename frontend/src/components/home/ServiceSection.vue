<template>
<h1>{{item.title }}</h1>
<p>{{ item.subtitle }}</p>
<ServiceCard 
:icon="items.icon" 
:title=""
:description=""
:link_text=""
 />


</template>

<script setup lang="ts">
import ServiceCard from './cards/ServiceCard.vue';

defineProps({
  items: Array

})
</script>
<style>

</style>