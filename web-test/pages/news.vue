<script setup lang="ts">

import axios from 'axios';
import { ref, onMounted } from 'vue';

const responseData = ref();
const route = useRoute();
const localeLocation = useLocalePath();

onMounted(() => {
    const currentPath = route.path;
    let lang = "en"

    if (currentPath.includes('/tw')) {
        lang = "zh-tw";
    } else if (currentPath.includes('/en')) {
        lang = "en";
    } else {
        lang = "en";
    }

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    const getTaipeiTripInfo = async () => {
        await axios.get('/api/' + lang + '/Events/News', config)
            .then(response => {
                responseData.value = response.data.data;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
    getTaipeiTripInfo();
});
</script>

<template>
    <div class="news-container">
        <div class="news-list-container">
            <div v-for="(data, index) in responseData" :key="index" class="news-list-item">
                <NuxtLink :to="localeLocation(
                    { 
                        name: 'news', 
                        params: { id: data.id }
                    })">
                    <div>{{ data.posted }}</div>
                    <div>{{ data.title }}</div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
.news-list-item {
    display: flex;
}
</style>
