module.exports = {response:response}

// function pin(message){
//     var msgCollect = message.channel.messages
//     var msgArray = Array.from(msgCollect.values())
//     var prevMsg = msgArray[msgArray.length -2]
//     prevMsg.pin()
//     return;
// }

// function unPin(message){
//     var channel = message.channel
//     var msg = channel.fetchPinnedMessages()
//     var msgArray = Array.from(msg);
//     msgArray.unpin()
//     return;
// }

// function schedule(message){
//     var msgarray = message.content.split(" ").slice(1).join(" ")
//     try{
//         const sched = await Schedulebase.create({
//             username: message.author.username,
//             event: msgarray,
//             guild: message.guild.name,
//             date: now,
//         })
//         return message.channel.send("When should I remind you about " + "*" + msgarray + "?*" + "**UNDER CONSTRUCTION**").catch(e => console.log(e))
//     }
//     catch (e) {
//         return message.reply('Something went wrong with this event')
//     }
// }

// function kill(message){
//     var msg = message.content.split(" ").slice(1).join(" ")
// 		if (!message.mentions.users.size) {
// 			return message.reply('you need to tag a user in order to kick them!')
// 		}
// 		try {
// 			const taggedUser = message.mentions.users.first()
// 			const killSet = await Ideabase.update({ kill_count: sequelize.literal('kill_count+1') }, { where: {username: taggedUser} })
// 			const killGet = await Ideabase.findAll({ where: {guild: message.guild.name}}, { attributes: ['kill_count'] })
// 			const killString = killGet.map(t => t.kill_count).join(', \n ') || 'No kills stored'
// 			return message.channel.send(`Killing: ` + taggedUser + '\n' + "Kill Count: " + killString)
// 		}
// 		catch (e) {
// 			return message.reply('This user does not exist')
// 		}
// }

// function clear(message){
//     const rowCount = await Ideabase.destroy({ where: { username: message.author.username, guild: message.guild.name} })
// 		if (!rowCount) return message.reply('That person did not have any ideas.')
		
// 		return message.reply('Deleted ' + message.author.username + '\'s notes')
// }

// function note(message){
//     var msg = message.content.split(" ").slice(1).join(" ")
//     try {
//         // equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?)
//         const dbNote = await Ideabase.create({
//             name: message.author.tag,
//             note: msg,
//             username: message.author.username,
//             guild: message.guild.name,
//             date: now,
//         })
//         //await Ideabase.increment({idea_count: 1}, {where: {username = message.author.username}})
//         return message.channel.send(`Writing down: ${dbNote.note}`).then(r => r.delete(5000))
//     }
//     catch (e) {
//         return message.channel.send("There was a problem with this note").then(r => r.delete(5000))
//     }
// }

// function notes(message){
// 	//change to embed response?
// 	const ideaList = await Ideabase.findAll({ where: {guild: message.guild.name}}, { attributes: ['note'] })
// 	const ideaString = ideaList.map(t => t.note).join(', \n ') || 'No ideas stored.'
// 	return message.channel.send(`Ideas: ${ideaString}`)
// }

function help(){
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

function sendMsg(msg){
    return msg
}

function embedMsg(message){
    //make an embed function
}

function response(message){
    //handle response letter case
    var response = ' '
    var msgDict = {
        'test!':'**B R I D G E T**',
        'thanks':'*UwU*',
        'pay respect': 'F.',
        'in the chat': 'F.',
    }
    // var funcDict = {
    //     'pin!': pin(message),
    //     'unpin!': unPin(message),
    //     'roll!': roll(message),
    //     'motion!': motion(message),
    //     'motions!': motions(message),
    //     'schedule!': schedule(message),
    //     'kill!': kill(message),
    //     'clear!': clear(message),
    //     'bridget!': note(message),
    //     'ideas!': notes(message),
    //     'help!': help(message),

    // }
    for (var key in msgDict){
        if (msgDict[message])
        {
            response = sendMsg(msgDict[key])
        }
    }
    // for (var key in funcDict){
    //     if(funcDict[message])
    //     {
    //         response = funcDict[key]
    //     }
    // }
    return response
}
