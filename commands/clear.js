module.exports = {
	name: 'clear',
	description: 'clear!',
	execute(message, args) {
        const rowCount = await Ideabase.destroy({ where: { username: message.author.username, guild: message.guild.name} })
            if (!rowCount) return message.reply('That person did not have any ideas.')
            
            return message.reply('Deleted ' + message.author.username + '\'s notes')
}
}