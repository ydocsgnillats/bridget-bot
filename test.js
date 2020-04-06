main = require('./main.js')
client = main.client

module.exports = {
	name: 'test',
	description: 'test!',
	execute(message, args) {
        message.channel.send("**B R I D G E T**" + "\n" + client.user.displayAvatarURL) 
    }
}