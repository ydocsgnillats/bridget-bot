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

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setActivity("Startup " + Date.now(), {type: "WATCHING"});
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

	if(cmd === 'thanks bridget' || cmd === 'Thanks bridget' || cmd === 'thanks Bridget' || cmd === 'Thanks Bridget'){
		return message.channel.send("*UwU*")
	}
})

client.login(process.env.TOKEN)
