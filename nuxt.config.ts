export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  nitro: {
    devProxy: {
      cors: true,
      open: true,
      proxy: {
        '^/api': {
          target: 'https://www.travel.taipei/open-api/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
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
  },
  source: "/api/:path*",
  headers: [
    { key: "Access-Control-Allow-Credentials", value: "true" },
    { key: "Access-Control-Allow-Origin", value: "*" },
    { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
  ]
})
