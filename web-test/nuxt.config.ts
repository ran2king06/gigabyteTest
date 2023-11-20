export default defineNuxtConfig({
  devtools: { enabled: true },
  vite: {
    server: {
      proxy: {
        '/api': {
          target: 'https://www.travel.taipei/open-api',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      }
    }
  },

  modules: [
    '@nuxtjs/i18n'
  ],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  i18n: {
    customRoutes: 'config',
    strategy: 'prefix_and_default',
    locales: ['en', 'tw'],
    defaultLocale: 'en',
    detectBrowserLanguage: false,
    vueI18n: './nuxt-i18n.ts'
  }
})
