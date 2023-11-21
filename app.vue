<template>
  <Header></Header>
  <div class="main-container">
    <div class="main-wrapper">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>

</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500&display=swap');

body {
  margin: 0;
  padding: 0;
  background-color: #232323;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

*, html {
  font-family: 'Noto Sans TC', sans-serif;
}

.main-container {
  padding-top: 60px;
  width: 90%;
  margin: 0 auto;
}

</style>
