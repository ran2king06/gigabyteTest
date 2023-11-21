const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (req, res) => {
    let target = ''
    if (req.url.startsWith('/api')) {
        target = 'https://www.travel.taipei/open-api/'
    }

    console.log('Proxying request:', req.url, 'to target:', target);
    
    createProxyMiddleware({
        target,
        changeOrigin: true,
        pathRewrite: {
            '^/api': '/',
        }
    })(req, res)
}
