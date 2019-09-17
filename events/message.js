const kick = require('../commands/kick')
const note = require('../commands/note')
const log = require('../commands/log')
const pin = require('../commands/pin')


module.exports = (client, message) => {

	if (message.content.startsWith('!kick')) {
		return kick(message)
	}

	if (message.content.startsWith('Bridget!')) {
		//log(message)
		var msgCollect = message.channel.messages;
		var msgArray = Array.from(msgCollect.values());
		var prevMsg = msgArray[msgArray.length -2];
		const fs = require('fs');
		
		client.ideas = require('../ideas.json');
		client.ideas[message.author.username] = {
			idea: prevMsg.content
		}
		fs.writeFile ('./ideas.json', JSON.stringify (client.ideas, null, 4), err => {
			if (err) throw err;
			message.channel.send ("Written");
		});
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
}
