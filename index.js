require('dotenv').config()

const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client()
const activities_list = [
    "Ram Ranch", 
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

	let messageArray = message.content.split(" ")
	let cmd = messageArray[0];

	if(cmd === 'btest'){
		return message.channel.send("**BRIDGET**")
	}

	if(cmd === 'thanks'){
		return message.channel.send("*UwU*")
	}
	if(cmd === 'Thanks'){
		return message.channel.send("*UwU*")
	}
	if(cmd === 'pin'){
		var msgCollect = message.channel.messages;
		var msgArray = Array.from(msgCollect.values());
		var prevMsg = msgArray[msgArray.length -2];
		prevMsg.pin();
		return;
	}
	if(cmd === 'bridgetrespect'){
		return message.channel.send("F.")
	}
	if(cmd === 'Pin'){
		var msgCollect = message.channel.messages;
		var msgArray = Array.from(msgCollect.values());
		var prevMsg = msgArray[msgArray.length -2];
		prevMsg.pin();
		return;
	}
	if(cmd === 'bridget!'){
		return message.channel.send("writing that down...")
	}
	if(cmd === 'Bridget!'){
		return message.channel.send("writing that down...")
	}
	if(cmd === 'mute!'){
		return message.channel.send("mute")
	}
	if(cmd === 'bridgetrespect'){
		return message.channel.send("F.")
	}
	if(cmd === 'roll!'){
		let num = (Math.random() * (101-1) + 1)
		return message.channel.send(parseInt(num))
	}
	if(cmd === 'bclear!'){
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
