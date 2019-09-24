const kick = require('../commands/kick')
const note = require('../commands/note')
const log = require('../commands/log')
const pin = require('../commands/pin')
const nice = require('../commands/nice')

module.exports = (client, message) => {

	if (message.content.startsWith('!kick')) {
		return kick(message)
	}

	if (message.content.startsWith('Bridget!')) {
		log(message)
		return note(message)
	}
	if (message.content.startsWith('bridget!')) {
		log(message)
		return note(message)
	}
	if (message.content.startsWith('Bridget')) {
		log(message)
		return note(message)
	}
	if (message.content.startsWith('bridget write that down')) {
		log(message)
		return note(message)
	}
	if (message.content.startsWith('Bridget write that down')) {
		log(message)
		return note(message)
	}
	if (message.content.startsWith('pin that')) {
		return pin(message)
	}
	if (message.content.startsWith('Pin that')) {
		return pin(message)
	}
	if (message.content.includes('69')) {
		return nice(message)
	}
}
