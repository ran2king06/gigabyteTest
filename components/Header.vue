<script setup lang="ts">
const switchLocalePath = useSwitchLocalePath();
const route = useRoute();
const localePath = useLocalePath();
</script>


<template>
  <header>
    <div class="header-lang">
      <div class="header-logo">
        <img src="" alt="">
      </div>
      <div class="header-menu">
        <span>
          <NuxtLink :to="localePath('index')">{{ $t('home') }}</NuxtLink>
        </span>
        <span>
          <NuxtLink :to="localePath('news')">{{ $t('news') }}</NuxtLink>
        </span>
        <span v-if="!route.params.id">
          <NuxtLink :to="switchLocalePath('tw')">中</NuxtLink>/
          <NuxtLink :to="switchLocalePath('en')">EN</NuxtLink>
        </span>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  height: auto;
  z-index: 99;
  transition: 1s;
  background-color: rgba(0,0,0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  border-bottom: 2px solid #F36002;
}

.header-lang {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-lang span {
  padding: 15px;
  margin: 0 10px;
  box-sizing: border-box;
  display: inline-block;
  color: #fff;
}

.header-lang a {
  cursor: pointer;
  text-decoration: none;
  color: #fff;
}

.header-lang a:hover {
  border-bottom: 2px solid #fff;
}
</style>
