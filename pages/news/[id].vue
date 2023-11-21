<script setup>
import axios from 'axios';
import { ref, onMounted, onUnmounted } from 'vue';
const route = useRoute();
const $attrs = useAttrs();
const runtimeConfig = useRuntimeConfig();

const currentPath = route.path;
let lang = "en" // Default English

const newsTitle = ref($attrs.newsTitle);
const newsContent = ref($attrs.newsContent);

const config = {
    headers: {
        'Accept': 'application/json'
    }
};

// 若超過50個字，則只顯示50個字
const truncateText = (text, maxLength) => {
    console.log(text);
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    } else {
        return text;
    }
}

// 頁面刷新或直接進去則呼叫此 Function
const getTaipeiTripInfoDetails = async () => {
    if (currentPath.includes('/tw')) {
        lang = "zh-tw";
    } else if (currentPath.includes('/en')) {
        lang = "en";
    } else {
        lang = "en";
    }

    await axios.get('/api' + '/open-api' + '/' + lang + '/Events/News', config)
        .then(response => {
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
        });
}

onMounted(() => {
    if (route.params.id) {
        getTaipeiTripInfoDetails();
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
        <h1>{{ newsTitle }}&nbsp;</h1>
        <p v-html="newsContent"></p>
    </div>
</template>

<style scoped>
.news-detail-container {
    display: block;
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
}

.news-detail-container h1 {
    border-bottom: 1px solid grey;
    padding: 0 0 25px 0;
    margin-bottom: 25px;
}

.news-detail-container p {
    white-space-collapse: preserve-breaks;
}
</style>
