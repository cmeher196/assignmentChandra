var express = require('express');
var bodyParser = require('body-parser')
var service = require('./service')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile("index.html");
});

app.get('/api/orders', async (req, res) => {
    try {
        let ordersData = await service.parseOrderData();
        res.send(ordersData);
    } catch (error) {
       res.status(504).send(); 
    }
});


var port = process.env.PORT || 8080;
app.listen(port);
console.log(`Server running at http://localhost:${port}`);