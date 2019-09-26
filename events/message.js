const note = require('../commands/note')
const pin = require('../commands/pin')
const welcome = require('../commands/welcome')

module.exports = (client, message) => {

		if (message.content.startsWith('Bridget!')) {
			if (message.author == client.user){
				return note(message)
			}
		}
		if (message.content.startsWith('bridget!')) {
			if (message.author == client.user){
				return note(message)
			}
		}
		if (message.content.includes('pin that')) {
			if (message.author == client.user){
				return pin(message)
			}
		}
		if (message.content.includes('Pin that')) {
			if (message.author == client.user){
				return pin(message)
			}
		}
		if (message.content.includes('thanks bridget')) {
			if (message.author == client.user){
				return welcome(message)
			}
		}
		if (message.content.includes('Thanks Bridget')) {
			if (message.author == client.user){
				return welcome(message)
			}
		}
		if (message.content.includes('Thanks bridget')) {
			if (message.author == client.user){
				return welcome(message)
			}
		}
		if (message.content.includes('thanks Bridget')) {
			if (message.author == client.user){
				return welcome(message)
			}
		}
	}
