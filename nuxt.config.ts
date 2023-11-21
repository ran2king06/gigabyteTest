export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
 
    },
  },
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
  generate: {
    fallback: true
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
