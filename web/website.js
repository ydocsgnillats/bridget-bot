//setting up the app website
let express = require('express')
let app = express()
app.use(express.static('web'))
app.get('/', function(req, res){
  res.sendFile('./index.html', { root : __dirname})
})
app.listen(process.env.PORT || 9000)