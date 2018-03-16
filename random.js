const generate = require('nanoid/generate')
const randomWords = require('random-words')
const random = {
  createWord() {
    return randomWords()
  },
  createInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  },
  createString(length, characters = 'all') {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const numbers = '0123456789'
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    let possible = uppercase + lowercase + numbers

    if (characters === 'lowercase') {
      possible = lowercase
    } else if (characters === 'uppercase') {
      possible = uppercase
    } else if (characters === 'numbers') {
      possible = numbers
    } else if (characters === 'lowercasenumbers') {
      possible = lowercase + numbers
    }

    return generate(possible, length)
  }
}

module.exports = random
