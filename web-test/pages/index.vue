<script setup lang="ts">
  const localePath = useLocalePath();
</script>

<template>
  <div class="home-container">
    <div class="home-center">
      <NuxtLink :to="localePath('news')">{{ $t('entrance') }}</NuxtLink>
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
  padding: 25px 50px;
  box-shadow: 0px 6px 100px -10px #7a7777;
  font-size: 2em;
  color: #000;
  font-weight: 600;
  width: 200px;
  display: block;
  text-align: center;
}

</style>
