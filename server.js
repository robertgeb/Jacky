var Server = exports

var WebSocket = require('ws'),
  Logger = require('./logger.js'),
  serverL = new Logger('Server'),
  ws = new WebSocket.Server({host: 'localhost', port: 8889}, () => {serverL.log('Waiting connection')}),
  commandsEvents = {
    toleft: () => {},
    tofront: () => {},
    toright: () => {},
    toback: () => {}
  }

ws.on('connection', function (conn) {
  serverL.log('Client connected')
  conn.on('message', function (data, flag) {
    try {
      commandsEvents[data]
    } catch (e) {
      serverL.log('Comando recebido inválido: ' + data)
    }
  })

  conn.on('error', function (err) {
    serverL.log(err)
  })
})


ws.on('error', function (err) {
  serverL.log(err)
})



Server.on = function (evt, callback) {
  commandsEvents[evt] = callback
}
