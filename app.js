var Logger = require('./logger.js'),
  Server = require('./server.js'),
  j5 = require('johnny-five'),
  board = new j5.Board()

board.on("ready", function(){

  var compass = new j5.Compass({
    controller: 'HMC5883L'
  })

  // var motorA = new j5.Motor([])

  compass.on('change', function () {
    try {
      Server.sendDir(Math.floor(this.heading))
    } catch (e) {
      console.log(e);
    } finally {

    }
  })

  var motorR = new j5.Motor({
    pins: {
      pwm: 5,
      dir: 8,
      cdir: 7
    }
  }),
    motorL = new j5.Motor({
      pins: {
        pwm: 6,
        dir: 13,
        cdir: 12
      }
    })

  compass.on('data', function () {
    try {
      Server.sendDir(Math.floor(this.heading))
    } catch (e) {
      console.log(e);
    } finally {

    }
  })

  Server.on('break', () => {
    motorL.stop()
    motorR.stop()
  })

  Server.on('tofront', () => {
    motorL.forward(255)
    motorR.forward(255)

  })

  Server.on('toleft', () => {
    motorR.reverse(120)
    motorL.forward(128)
  })

  Server.on('toright', () => {
    motorL.reverse(120)
    motorR.forward(128)
  })

  Server.on('toback', () => {
    motorL.reverse(255)
    motorR.reverse(255)
  })

})
