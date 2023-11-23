<script setup>
import axios from 'axios';
import { ref, onMounted, onUnmounted } from 'vue';
const route = useRoute();
const $attrs = useAttrs();

const currentPath = route.path;
let lang = "en" // Default English

const newsTitle = ref($attrs.newsTitle);
const newsContent = ref($attrs.newsContent);

const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    } else {
        return text;
    }
}

const config = {
    headers: {
        "Accept": "application/json"
    }
}

if (currentPath.includes('/tw')) {
    lang = "zh-tw";
} else if (currentPath.includes('/en')) {
    lang = "en";
} else {
    lang = "en";
}

await useAsyncData('seo', async () => {
    $fetch('https://www.travel.taipei/open-api' + '/' + lang + '/Events/News', config)
        .then(v => {
            const d = v.data.find((s) => {
                return s.id.toString() === route.params.id;
            })
            useSeoMeta({
                title: d.title,
                ogTitle: d.title,
                description: truncateText(d.description, 50),
                ogDescription: truncateText(d.description, 50),
            });

        })
})


const getTaipeiTripInfoDetails = async () => {
    if (currentPath.includes('/tw')) {
        lang = "zh-tw";
    } else if (currentPath.includes('/en')) {
        lang = "en";
    } else {
        lang = "en";
    }

    await axios.get('/api' + '/' + lang + '/Events/News')
        .then(response => {
            const getNews = response.data.data.filter((r) => {
                return r.id.toString() === route.params.id;
            });
            newsTitle.value = getNews[0].title;
            newsContent.value = getNews[0].description;
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
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 15px;
    box-sizing: border-box;
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
