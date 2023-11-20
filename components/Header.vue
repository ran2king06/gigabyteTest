<script setup lang="ts">
  const switchLocalePath = useSwitchLocalePath();
  const route = useRoute();
  const localePath = useLocalePath();
</script>


<template>
  <header class="header-lang">
    <span>
      <NuxtLink :to="localePath('index')">{{ $t('home') }}</NuxtLink>
    </span>
    <span>
      <NuxtLink :to="localePath('news')">{{ $t('news') }}</NuxtLink>
    </span>
    <span v-if="!route.params.id">
      <NuxtLink :to="switchLocalePath('tw')">中</NuxtLink> 
      / 
      <NuxtLink :to="switchLocalePath('en')">EN</NuxtLink>
    </span>
  </header>
</template>

<style scoped>
header.header-lang {
  position: fixed;
  display: flex;
  right: 5%;
  top: 5%;
  align-items: center;
  justify-content: space-between;
}

header.header-lang span {
  margin: 0 15px;
}

header.header-lang a {
  margin: 0 10px;
  cursor: pointer;
  text-decoration: none;
}

.hello {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 3rem;
  padding: 2rem;
}

body {
  margin: 0;
  padding: 0;
}
</style>
