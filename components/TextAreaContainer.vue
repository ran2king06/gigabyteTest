<script setup lang="ts">
import { computed, defineEmits , defineProps } from "vue";
const props = defineProps({
  isShowDesc: String
});

const emits = defineEmits(["update:isShowDesc"]);

const inputValue = computed({
  get() {
    return props.isShowDesc;
  },
  set(newValue) {
    emits("update:isShowDesc", newValue);
  }
});
</script>


<template>
  <div class="container">
    <input v-model="inputValue" />
  </div>
</template>

<style scoped>
</style>