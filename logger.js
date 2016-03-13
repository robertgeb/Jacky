'use strict'
function Logger(name) {
  this.name = name
}

Logger.prototype.log = function (msg) {
  if (!process.stdout.isTTY) {
    return;
  }
  process.stdout.write(`${Date.now()} `)
  process.stdout.write(`\t\x1b[0;31m${this.name}`)
  process.stdout.write(`\t\x1b[1;37m${msg}`)
  process.stdout.write(`\x1b[m\n`)
}

module.exports = Logger
