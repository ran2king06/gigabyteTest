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
            '^/api': '/',
        }
    })(req, res)
}