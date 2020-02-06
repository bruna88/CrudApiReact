
// Imporantdo 
const express = require('express') // Framework para aplicativos web
const bodyParser = require('body-parser') // lib q faz parse do body 
const routes = require('./src/router') // rotas da api
const MongoDB = require('./src/config/MongoDB') // config banco de dados mongo


// APP
const app = express()
const http = require('http').Server(app);

// bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res, next) {
  res.json('online');
});


// Routes
app.use('/', routes)


// Servidor ouvindo 
const port = 8900
http.listen(port, () => {
  console.log("o servidor esta rodando na porta", port)
});