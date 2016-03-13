var Board = (function() {

  var socket = {}

  var serverConn = false

  function pubBootstrap () {
    socket = new WebSocket('ws://localhost:8889')

    socket.onopen = function (ev) {
      serverConn = true
      console.log('Conexão estabelecida.')
    }

    socket.onerror = function (err) {
      console.log('Erro na conexão: ')
      console.log(err)
    }
  }

  function pubSendComm (comm) {
    if (!serverConn) throw 'Falha ao enviar comando. Conexão não estabelecida.'
    var msg = comm
    socket.send(msg)
  }

  return {
    init: pubBootstrap,
    sendComm: pubSendComm
  }
})()

var Client = (function(window) {

  /**
   * Atribução do comando a respectiva tecla
   * @type {Object}
   */
  var commands = {
    '37': () => {leftCommand()},
    '38': () => {upCommand()},
    '39': () => {rightCommand()},
    '40': () => {downCommand()}
  }

  var leftCommand, upCommand, rightCommand, downCommand

  function pubBootstrap () {
    window.onkeydown = function (event) {
      if (event.keyCode >= 37 && event.keyCode <= 40) {
        commands[event.keyCode.toString()]()
      }
    }
  }

  function pubSetEventHandler (evt, callback) {
    try {
      eval(evt + ' = callback')
    } catch (e) {
      console.log(e)
    } finally {
      console.log('Chou');
    }
  }

  return {
    init: pubBootstrap,
    on: pubSetEventHandler
  }
})(window);

window.onload = function () {
  Client.init()
  Board.init()
  Client.on('leftCommand', () => {
    Board.sendComm('toleft')
  })

  Client.on('upCommand', () => {
    Board.sendComm('tofront')
  })

  Client.on('rightCommand', () => {
    Board.sendComm('toright')
  })

  Client.on('downCommand', () => {
    Board.sendComm('toback')
  })
}
