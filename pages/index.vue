<script setup lang="ts">
import { ref } from "vue";
import TextAreaContainer from './../components/TextAreaContainer.vue'
const localePath = useLocalePath();

const isShowDesc = ref('0')
const showDesc = ref('0')

const getShowDesc = (childValue: string) => {
  showDesc.value = childValue
}
</script>

<template>
  <div class="home-container">
    <div class="home-center">
      <NuxtLink :to="localePath('news')">{{ $t('entrance') }}</NuxtLink>
    </div>
    <!-- <div class="TextArea-container">
        <TextAreaContainer :is-show-desc="isShowDesc" @update:isShowDesc="getShowDesc"/>

        {{ showDesc }}
  </div> -->

  </div>
</template>

<style scoped>
.home-container {
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.home-center {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}

.home-center a {
  text-decoration: none;
  padding: 25px 50px;
  box-shadow: 0px 6px 100px -10px #7a7777;
  font-size: 2em;
  color: #091350;
  font-weight: 600;
  width: 200px;
  display: block;
  text-align: center;
  background: #d6dade;
}
</style>
; s·