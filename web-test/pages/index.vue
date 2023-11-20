<script setup lang="ts">
  const localePath = useLocalePath();

</script>

<template>
  <div class="home-container">
    <div class="home-center">
      <NuxtLink :to="localePath('news')">進入News頁面</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  width: 100svw;
  height: 100svh;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.home-center a {
  text-decoration: none;
}
</style>