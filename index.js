var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello World!...' + process.env.MY_ENV_VAR)
})

var port = process.env.OPENSHIFT_NODEJS_PORT || 5000;
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.listen(port, ip, function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
