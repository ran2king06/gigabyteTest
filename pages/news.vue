<script setup lang="ts">

import axios from 'axios';
import { ref, onMounted } from 'vue';

const responseData = ref();
const route = useRoute();
const localeLocation = useLocalePath();
const runtimeConfig = useRuntimeConfig();

let newsTitle = "";
let newsContent = "";

onMounted(() => {
    const currentPath = route.path;
    let lang = "en" // Default English

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    const getTaipeiTripInfo = async () => {
        if (currentPath.includes('/tw')) {
            lang = "zh-tw";
        } else if (currentPath.includes('/en')) {
            lang = "en";
        } else {
            lang = "en";
        }

        await axios.get('/api' + '/open-api' + '/' + lang + '/Events/News', config)
            .then(response => {
                responseData.value = response.data.data;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
    getTaipeiTripInfo();
});

function formatDate(inputDate: string) {
    const date = new Date(inputDate);
    if (isNaN(date.getTime())) {
        return "Invalid Date";
    }
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}/${month}/${day}`;
    return formattedDate;
}

function newsPass(title: string, content: string) {
    newsTitle = title;
    newsContent = content


}

</script>

<template>
    <div class="news-container">
        <div v-if="!$route.params.id" class="news-list-container">
            <div v-for="(data, index) in responseData" :key="index" class="news-list-item">
                <span>{{ formatDate(data.posted) }}</span>
                <NuxtLink @click="newsPass(data.title, data.description)" :to="localeLocation(
                    {
                        name: 'news-id',
                        params: { id: data.id }
                    })">
                    <span>{{ data.title }}</span>
                </NuxtLink>
            </div>
        </div>
        <div>
            <NuxtPage :newsTitle="newsTitle" :newsContent="newsContent"></NuxtPage>
        </div>
    </div>
</template>

<style scoped>
.news-list-item {
    display: flex;
    padding: 5px 10px;
    box-sizing: border-box;
    margin: 10px;
    align-items: center;
}

.news-list-item span {
    margin: 0 10px;
}

.news-list-item {
    text-decoration: none;
}
</style>
