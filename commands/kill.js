module.exports = {
	name: 'kill',
	description: 'kill!',
	execute(message, args) {
        var msg = message.content.split(" ").slice(1).join(" ")
		if (!message.mentions.users.size) {
			return message.reply('you need to tag a user in order to kick them!')
		}
		try {
			const taggedUser = message.mentions.users.first()
			const killSet = Ideabase.update({ kill_count: sequelize.literal('kill_count+1') }, { where: {username: taggedUser} })
			const killGet = Ideabase.findAll({ where: {guild: message.guild.name}}, { attributes: ['kill_count'] })
			const killString = killGet.map(t => t.kill_count).join(', \n ') || 'No kills stored'
			return message.channel.send(`Killing: ` + taggedUser + '\n' + "Kill Count: " + killString)
		}
		catch (e) {
			return message.reply('This user does not exist')
		}
    }
}