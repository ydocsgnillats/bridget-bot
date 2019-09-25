const note = require('../commands/note')
const pin = require('../commands/pin')
const nice = require('../commands/nice')

module.exports = (client, message) => {

	if (message.content.startsWith('Bridget!')) {
		return note(message)
	}
	if (message.content.startsWith('bridget!')) {
		return note(message)
	}
	if (message.content.includes('pin that')) {
		return pin(message)
	}
	if (message.content.includes('Pin that')) {
		return pin(message)
	}
	if (message.content.includes('69')) {
		return nice(message)
	}
}
