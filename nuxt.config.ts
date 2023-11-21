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
          configure: (proxy, options) => {
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('Sending Request to the Target:', req.method, options.target + proxyReq.path);
            });
  
            proxy.on('proxyRes', (proxyRes, req, res) => {
              console.log('Receiving Response from the Target:', req.method, options.target + req.url);
            });
  
            proxy.on('error', (err, req, res) => {
              console.log('Error Occurred:', err);
            });
          }
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
