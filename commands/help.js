const discord = require('__dirname/app.js')
const Discord = discord.Discord

module.exports = message => {
    let sEmbed = new Discord.RichEmbed()
		.setColor('#ffcba4')
		.setTitle("Bridget:")
		.setDescription("A secretary Bot")
		.addField("**bridget!**", "writes things down", true)
		.addField("**ideas!**", "recalls ideas by user", true)
		.addField("**clear!**", "clears user's ideas", true)
		.addField("**pin!**", "pins the last message", true)
		.addField("**thanks**", "you're welcome", true)
		.addField("**pay respect**", "get an F in the chat", true)
		.addField("**roll!**", "random roll between 1 and 100", true)
		.addField("**schedule!**", "schedule reminders", true)
		.addField("**kill!**", "kills a user", true)
		.addField("**help!**", "sends this message", true)
		.setFooter('BridgetBot2020', client.user.displayAvatarURL)
        return message.channel.send({embed: sEmbed})
}