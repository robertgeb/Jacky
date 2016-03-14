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
  },
  clientCon = null

ws.on('connection', function (conn) {
  clientCon = conn
  serverL.log('Client connected')
  conn.on('message', function (data, flag) {
    try {
      commandsEvents[data]()
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

ws.broadcast = function broadcast(data) {
  ws.clients.forEach(function each(client) {
    client.send(data);
  });
};

Server.sendDir = function (deg) {
  ws.broadcast(deg.toString())
}

Server.on = function (evt, callback) {
  commandsEvents[evt] = callback
}
