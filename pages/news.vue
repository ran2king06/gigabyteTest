<script setup lang="ts">

import axios from 'axios';
import { ref, onMounted } from 'vue';

const responseData = ref();
const route = useRoute();
const localeLocation = useLocalePath();

let newsTitle = "";
let newsContent = "";

const loading = ref(true)

onMounted(() => {
    const currentPath = route.path;
    let lang = "en" // Default English

    const getTaipeiTripInfo = async () => {
        loading.value = true;

        if (currentPath.includes('/tw')) {
            lang = "zh-tw";
        } else if (currentPath.includes('/en')) {
            lang = "en";
        } else {
            lang = "en";
        }

        await axios.get('/api' + '/' + lang + '/Events/News')
            .then(response => {
                responseData.value = response.data.data;
                loading.value = false;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                loading.value = false;
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
    <h1>{{ $t('news-title') }}</h1>
    <div class="news-container">
        <div v-if="!$route.params.id" class="news-list-container">
            <div v-for="(data, index) in responseData" :key="index" class="news-list-item">
                <span class="date">{{ formatDate(data.posted) }}</span>
                <NuxtLink @click="newsPass(data.title, data.description)" :to="localeLocation(
                    {
                        name: 'news-id',
                        params: { id: data.id }
                    })">
                    <span>{{ data.title }}</span>
                </NuxtLink>
            </div>
        </div>
        <img v-if="loading === true" src="/img/loading.svg" alt="" class="loading-svg">
        <div>
            <NuxtPage :newsTitle="newsTitle" :newsContent="newsContent"></NuxtPage>
        </div>
    </div>
</template>

<style scoped>
.news-container {
    margin-bottom: 50px;
    position: relative;
    height: 100%;
    min-height: 600px;
}

.loading-svg {
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
}

.news-list-container {
    display: grid;
    grid-template-columns: auto auto auto;
    max-width: 1000px;
    margin: 0 auto;
}

.news-list-item {
    padding: 7.5px 10px;
    box-sizing: border-box;
    margin: 10px;
    align-items: center;
    text-decoration: none;
    background: #4b4d4e;
}

.news-list-item .date {
    font-size: 0.8em;
}

.news-list-item span {
    margin: 0 10px;
    display: block;
    color: #fff;
    text-decoration-line: underline;
    text-decoration-color: #3ba0da;
    text-shadow: 1px 1px 1px #000000;
}

.news-list-item {
    text-decoration: none;
}

.news-list-item span {
    color: #fff;
}

h1 {
    color: #FF6400;
    font-weight: 400;
    max-width: 1000px;
    margin: 0 auto 10px auto;
}
</style>
