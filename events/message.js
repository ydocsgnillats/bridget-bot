const note = require('../commands/note')
const pin = require('../commands/pin')
const welcome = require('../commands/welcome')
const say = require('../commands/say')

module.exports = (client, message) => {
		if(message.author.bot) return;

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
		if (message.content.includes('thanks bridget')) {
			return welcome(message)
		}
		if (message.content.includes('Thanks Bridget')) {
			return welcome(message)
		}
		if (message.content.includes('Thanks bridget')) {
			return welcome(message)
		}
		if (message.content.includes('thanks Bridget')) {
			return welcome(message)
		}
		if (message.content.startsWith('btest')) {
			return say(message)
		}
		if (message.content.startsWith('btest')) {
			return say(message)
		}
	}
