// const { createProxyMiddleware } = require('http-proxy-middleware')
import { createProxyMiddleware } from 'http-proxy-middleware';

const proxy = createProxyMiddleware({
    target: "https://www.travel.taipei/open-api/", 
    pathRewrite: {'^/api': '', }, 
    changeOrigin: true,
  });
  
  export default proxy;
