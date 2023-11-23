// const { createProxyMiddleware } = require('http-proxy-middleware')
import { createProxyMiddleware } from 'http-proxy-middleware';

const proxy = createProxyMiddleware('/api',{
    target: "https://www.travel.taipei/open-api/", 
    pathRewrite: {'^/api': ''}, 
    changeOrigin: true,
  });
  
//  export default proxy;

 
export default async function handler(req, res) {
     proxy(req, res, (err) => {
         if (err) {
             throw err;
         }
 
         throw new Error(`Local proxy received bad request for ${req.url}`);
     });
 }
 
 export const config = {
     api: {
         // Proxy middleware will handle requests itself, so Next.js should 
         // ignore that our handler doesn't directly return a response
         externalResolver: true,
         // Pass request bodies through unmodified so that the origin API server
         // receives them in the intended format
         bodyParser: false,
     },
 }
 
