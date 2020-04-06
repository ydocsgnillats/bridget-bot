module.exports = {
	name: 'schedule',
	description: 'schedule!',
	execute(message, args) {
        var msgarray = message.content.split(" ").slice(1).join(" ")
        try{
            const sched = Schedulebase.create({
                username: message.author.username,
                event: msgarray,
                guild: message.guild.name,
                date: now,
            })
            return message.channel.send("When should I remind you about " + "*" + msgarray + "?*" + "**UNDER CONSTRUCTION**").catch(e => console.log(e))
        }
        catch (e) {
            return message.reply('Something went wrong with this event')
        }
    }
}