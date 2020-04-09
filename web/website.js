let express = require('express')
let app = express()
app.use(express.static('web'))
app.get('/', function(req, res){
  res.sendFile('./index.html', { root : __dirname})
})
app.listen(9000)

//setting up the app website
var http = require('http')
http.createServer(function (req, res){
  app.sendFile('./index.html', { root : __dirname})
}).listen(8080)
