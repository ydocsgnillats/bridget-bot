const kick = require('../commands/kick')

module.exports = (client, message) => {
	if (message.content.startsWith('!kick')) {
		return kick(message)
	}
}
    
const score = require('../commands/score')

module.exports = (client, message) => {
	if (message.content.startWith('!score')) {
		return score(message)
	}
}