<script setup lang="ts">
  const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <div class="header-lang">
    <NuxtLink :to="switchLocalePath('tw')">中</NuxtLink> 
    / 
    <NuxtLink :to="switchLocalePath('en')">英</NuxtLink>
  </div>
  <div class="main-container">
    <div class="main-wrapper">
      <NuxtPage />
    </div>
  </div>

</template>

<style>
.header-lang {
  position: fixed;
  display: flex;
  right: 5%;
  top: 5%;
}

.header-lang a {
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