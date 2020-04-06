module.exports = {
	name: 'return',
	description: 'return!',
	execute(message, args) {
    //change to embed response?
    //return database data depending on database named, by user
	const ideaList = await Ideabase.findAll({ where: {guild: message.guild.name}}, { attributes: ['note'] })
	const ideaString = ideaList.map(t => t.note).join(', \n ') || 'No ideas stored.'
	return message.channel.send(`Ideas: ${ideaString}`)
}
}