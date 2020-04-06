const main = require('./main.js')
const avatar = main.avatar

module.exports = {
	name: 'test',
	description: 'test!',
	execute(message, args) {
        message.channel.send("**B R I D G E T**" + "\n" + avatar) 
    }
}