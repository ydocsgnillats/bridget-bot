const note = require('../commands/note')
const pin = require('../commands/pin')
const welcome = require('../commands/welcome')
const say = require('../commands/say')
const log = require('../commands/log')

module.exports = (client, message) => {
		if(message.author.bot) return;

		if (message.content.startsWith('Bridget!')) {
			log(message)
			return note(message)
		}
		if (message.content.startsWith('bridget!')) {
			log(message)
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
	}
