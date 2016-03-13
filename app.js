var Logger = require('./logger.js'),
  Server = require('./server.js'),
  j5 = require('johnny-five'),
  board = new j5.Board()
  pins = [],
  action = () => {}


const OUTPUT = 1

pins[5] = OUTPUT  // Speed motor A
pins[6] = OUTPUT  // Speed motor B
pins[7] = OUTPUT  // Dir1 motor A
pins[8] = OUTPUT  // Dir2 motor A
pins[12] = OUTPUT // Dir1 motor B
pins[13] = OUTPUT // Dir1 motor B

Server.on('toleft', () => {
  action = (that) => {
    that.analogWrite(pins[5], 255)
    that.digitalWrite(pins[7], 1)
    that.digitalWrite(pins[8], 0)
    that.analogWrite(pins[5], 255)
    that.digitalWrite(pins[12], 0)
    that.digitalWrite(pins[13], 1)
  }
})

Server.on('tofront', () => {
  action = (that) => {
    that.analogWrite(pins[5], 255)
    that.digitalWrite(pins[7], 0)
    that.digitalWrite(pins[8], 1)
    that.analogWrite(pins[5], 255)
    that.digitalWrite(pins[12], 0)
    that.digitalWrite(pins[13], 1)
  }
})

Server.on('toright', () => {
  action = (that) => {
    that.analogWrite(pins[5], 255)
    that.digitalWrite(pins[7], 0)
    that.digitalWrite(pins[8], 1)
    that.analogWrite(pins[5], 255)
    that.digitalWrite(pins[12], 1)
    that.digitalWrite(pins[13], 0)
  }
})

Server.on('toback', () => {
  action = (that) => {
    that.analogWrite(pins[5], 255)
    that.digitalWrite(pins[7], 1)
    that.digitalWrite(pins[8], 0)
    that.analogWrite(pins[5], 255)
    that.digitalWrite(pins[12], 1)
    that.digitalWrite(pins[13], 0)
  }
})

Server.on('break', () => {
  action = (that) => {
    that.analogWrite(pins[5], 0)
    that.digitalWrite(pins[7], 0)
    that.digitalWrite(pins[8], 1)
    that.analogWrite(pins[5], 0)
    that.digitalWrite(pins[12], 0)
    that.digitalWrite(pins[13], 1)
  }
})

board.on("ready", function(){
  var val = 0;
  for (var i in pins) {
    if (pins.hasOwnProperty(i)) {
      this.pinMode(i, pins[i])
    }
  }

  this.loop( 50, function() {
    action()
  })
})
