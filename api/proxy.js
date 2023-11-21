const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (req, res) => {
    let target = ''
    if (req.url.startsWith('/backend')) {
        target = 'https://www.travel.taipei/open-api'
    }
    // 创建代理对象并转发请求
    createProxyMiddleware({
        target,
        changeOrigin: true,
        pathRewrite: {
            '^/backend/': '/',
        },
    })(req, res)
}