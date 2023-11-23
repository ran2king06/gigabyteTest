<script setup>
import axios from 'axios';
import { ref, onMounted, onUnmounted } from 'vue';
const route = useRoute();
const $attrs = useAttrs();

const currentPath = route.path;
let lang = "en" // Default English

const newsId = ref($attrs.newsId);
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

useAsyncData('seo', async () => {
    await $fetch("https://gigabyte-test.vercel.app/api" + '/' + lang + '/Events/News', config)
        .then(v => {
            const d = v.data.find((s) => {
                return s.id.toString() === route.params.id;
            })

            if(route.params.id === '45417') {
                useSeoMeta({
                    title: $t('customize-page'),
                    ogTitle: $t('customize-page'),
                    description: $t('customize-page'),
                    ogDescription: $t('customize-page'),
                });
            } else {
                useSeoMeta({
                    title: d.title,
                    ogTitle: d.title,
                    description: truncateText(d.description, 50),
                    ogDescription: truncateText(d.description, 50),
                });
            }

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
            newsId.value = getNews[0].id

            if(route.params.id === '45417') {
                useSeoMeta({
                    title: $t('customize-page'),
                    ogTitle: $t('customize-page'),
                    description: $t('customize-page'),
                    ogDescription: $t('customize-page'),
                });
            } else {
                useSeoMeta({
                title: newsTitle,
                ogTitle: newsTitle,
                description: truncateText(newsContent, 50),
                ogDescription: truncateText(newsContent, 50),
            });
            }
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
        <div v-if="newsId && newsId === 45417">
            <h1>{{ $t('customize-page') }}</h1>
        </div>
        <div v-else>
            <h1>{{ newsTitle }}</h1>
            <p v-html="newsContent"></p>
        </div>

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
