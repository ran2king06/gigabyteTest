var express = require('express');
var router = express.Router();
var Client = require('node-rest-client').Client;
var client = new Client();
/* GET users listing. */
router.get('/', function(req, res, next) {
    let queries=req.query
    console.log('query: ', queries);
    res.setHeader("Accept", "application/json");

    let url='https://www.travel.taipei/open-api/zh-tw/Events/News'
    var options = {
        host: url,
        method: 'GET',
      };
    
    client.get(url, function (data, response) { 
        console.log({data});
        res.json({data})
    });
});
module.exports = router;