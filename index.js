require('dotenv').config()

var start = 0;

const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client()
const activities_list = [
    "Ram Ranch", 
    "Gamers Rise Up",
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

fs.readdir('./events/', (err, files) => {
    files.forEach(file => {
		const eventHandler = require(`./events/${file}`)
		const eventName = file.split('.')[0]
		client.on(eventName, (...args) => eventHandler(client, ...args))
	})
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setActivity("Startup " + start);
  start+1;
  setInterval(() => {
	const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
	client.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
  }, 300000); // Runs this every 20 minutes.
})

client.login(process.env.TOKEN)
