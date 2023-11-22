<script setup>
import axios from 'axios';
import { ref, onMounted, onUnmounted } from 'vue';
const route = useRoute();
const $attrs = useAttrs();

const currentPath = route.path;
let lang = "en" // Default English

const newsTitle = ref($attrs.newsTitle);
const newsContent = ref($attrs.newsContent);
const loading = ref(true)

// const config = {
//     headers: {
//         'Accept': 'application/json',
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Headers': 'Content-Type,token'
//     }
// };

// 若超過50個字，則只顯示50個字
const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    } else {
        return text;
    }
}

useSeoMeta({
  title: newsTitle,
  ogTitle: newsTitle,
  description: truncateText(newsContent, 50),
  ogDescription: truncateText(newsContent, 50),
})

useHead({
    title: newsTitle,
    meta: [
    { name: 'description', content: newsContent }
  ],
})

// 頁面刷新或直接進去則呼叫此 Function
const getTaipeiTripInfoDetails = async () => {
    loading.value = true;

    if (currentPath.includes('/tw')) {
        lang = "zh-tw";
    } else if (currentPath.includes('/en')) {
        lang = "en";
    } else {
        lang = "en";
    }

    // const cors = 'https://cors-anywhere.herokuapp.com/'; // use cors-anywhere to fetch api data
    // const url = 'https://www.travel.taipei/open-api/'; // origin api url

    await axios.get('/api' + '/' + lang + '/Events/News')
        .then(response => {
            loading.value = false;
            
            const getNews = response.data.data.filter((r) => {
                return r.id.toString() === route.params.id;
            });
            newsTitle.value = getNews[0].title;
            newsContent.value = getNews[0].description;

            useSeoMeta({
                title: getNews[0].title,
                ogTitle: getNews[0].title,
                description: truncateText(getNews[0].description, 50),
                ogDescription: truncateText(getNews[0].description, 50),
            })


        })
        .catch(error => {
            console.error('Error fetching data:', error);
            loading.value = false;
        });
}

onMounted(() => {
    if (route.params.id) {
        getTaipeiTripInfoDetails();
        loading.value = false;
    }
});

onUnmounted(() => {
    useSeoMeta({
        title: "Test",
        ogTitle: "Test",
        description: "Test",
        ogDescription: "Test"
    })
})

</script>

<template>
    <div class="news-detail-container">
        <img v-if="loading === true" src="/img/loading.svg" alt="" class="loading-svg">
        <h1>{{ newsTitle }}&nbsp;</h1>
        <p v-html="newsContent"></p>
    </div>
</template>

<style scoped>
.loading-svg {
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
}


.news-detail-container {
    display: block;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 15px;
    box-sizing: border-box;
    position: relative;
    min-height: 600px;
}

.news-detail-container h1 {
    border-bottom: 1px solid grey;
    padding: 0 0 25px 0;
    margin-bottom: 25px;
    color: #fff;
}

.news-detail-container p {
    color: #fff;
    white-space-collapse: preserve-breaks;
}
</style>
