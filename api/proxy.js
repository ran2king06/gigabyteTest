const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (req, res) => {
    let target = ''
    if (req.url.startsWith('/api')) {
        target = 'https://www.travel.taipei/open-api/'
    }
    createProxyMiddleware({
        target,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
            '^/api/': '/',
        },
        headers:{
            Origin:"https://www.travel.taipei/open-api",
            Referer:"https://www.travel.taipei/open-api/",
          },
          "onProxyReq": (request, req, res) => {
              request.removeHeader('x-forwarded-host');
              request.removeHeader('x-forwarded-proto');
              request.removeHeader('x-forwarded-port');
              request.removeHeader('x-forwarded-for');
          }
    })(req, res)
}