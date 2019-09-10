const kick = require('../commands/kick')
const note = require('../commands/note')

module.exports = (client, message) => {
	if (message.content.startsWith('!kick')) {
		return kick(message)
	}

	if (message.content.startsWith('bridget!')) {
		return note(message)
	}
}