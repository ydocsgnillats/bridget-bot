require('dotenv').config()

const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client()
const scheduler = require('./scheduler.js')
const note = require('./note.js')
const activities_list = [
    "your stupid ideas over in her head", 
    "goat simulator",
    "the BYAND",
    "planetary annihalation",
    "HE-MAN HEYEAYEA SONG FOR 10 HOURS",
    "OWO what's this???",
    "My Little Pony: Friendship is Magic",
    "the role of the secretary we never had",
    "Halo MCCPC",
    "Destiny",
    "KFC dating simulator",
    "Warcraft: Reforged",
    "Battletoads 2",
    "Nightmares of a forgotten past",
    "Nightcrawlers"
	
    ]; // creates an arraylist containing phrases you want your bot to switch through.

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`)
  let date = new Date();
  client.user.setActivity("Initialization: " + (date.getSeconds()), {type: "PLAYING"});
  setInterval(() => {
	const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
	client.user.setActivity(activities_list[index], {type: "STREAMING"}); // sets bot's activities to one of the phrases in the arraylist.
  }, 300000); // Runs this every 20 minutes.
})

client.on('message', async message => {
	if(message.author.bot || message.channel.type === 'dm') return;

	if(message.content.includes('btest')){
		return message.channel.send("**BRIDGET**")
	}

	if(message.content.includes('thanks')){
		return message.channel.send("*UwU*")
	}

	if(message.content.includes('pin ')){
		var msgCollect = message.channel.messages;
		var msgArray = Array.from(msgCollect.values());
		var prevMsg = msgArray[msgArray.length -2];
		prevMsg.pin();
		return;
	}
	if(message.content.includes('pay respect')){
		return message.channel.send("F.")
	}
	if(message.content.includes('in the chat')){
		return message.channel.send("F.")
	}
	if(message.content.includes('bridget!')){
		return note(message)
	}
	if(message.content.includes('mute!')){
		return message.channel.send("mute")
	}
	if(message.content.includes('roll!')){
		let num = (Math.random() * (101-1) + 1)
		return message.channel.send(parseInt(num))
	}
	if(message.content.includes('help!')){
		let sEmbed = new Discord.RichEmbed()
		.setColor('#ffcba4')
		.setTitle("Bridget:")
		.setDescription("A secretary Bot")
		.addField("**bridget!**", "writes things down", true)
		.addField("**Pin!**", "pins the last message", true)
		.addField("**Thanks**", "you're welcome", true)
		.addField("**pay respect**", "to get an F in the chat", true)
		.addField("**roll!**", "random roll between 1 and 100", true)
		.addField("**help!**", "sends this message", true)
		.setFooter('BridgetBot2019', client.user.displayAvatarURL);
		message.channel.send({embed: sEmbed});
		//message.channel.send(sEmbed);
	}
	if (message.content.startsWith('schedule!')) {
		return scheduler(message)
	}

	if(message.content.includes('bclear!')){
		message.channel.fetchMessages()
			  .then(messages => {
				if(message.author.bot){
					message.channel.bulkDelete(10)
					messagesDeleted = messages.array().length; // number of messages deleted
					// Logging the number of messages deleted on both the channel and console.
					message.channel.sendMessage("Bridget messages deleted: "+messagesDeleted);
					console.log('Deletion of messages successful. Total messages deleted: '+messagesDeleted)
				}
				else{
					return message.channel.sendMessage("failed to clear messages");
				}
			  })
			  .catch(err => {
				console.log('Error while doing Bulk Delete');
				console.log(err);
			  });
			}

	})

client.login(process.env.TOKEN)
