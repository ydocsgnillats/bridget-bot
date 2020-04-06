module.exports = {
	name: 'write',
	description: 'write!',
	execute(message, args) {
        var msg = message.content.split(" ").slice(1).join(" ")
        try {
            const dbNote = Ideabase.create({
                name: message.author.tag,
                note: msg,
                username: message.author.username,
                guild: message.guild.name,
                date: now,
            })
            Ideabase.increment({idea_count: 1}, {where: {username = message.author.username}})
            return message.channel.send(`Writing down: ${dbNote.note}`).then(r => r.delete(5000))
        }
        catch (e) {
            return message.channel.send("There was a problem with this note").then(r => r.delete(5000))
        }
    }
}