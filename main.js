require('dotenv').config()

const Discord = require('discord.js')
const fs = require('fs')
const web = require("./web/website.js")
const prefix = "!"
const activities = require('./activities.js')
const activities_list = activities.activitylist()
const client = new Discord.Client()
client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// setting up the bot, syncing databases, setting activity
const date = require('date-and-time')
const now = new Date()
date.format(now, 'YYYY/MM/DD HH:mm:ss')

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`)
  let date = new Date()
  client.user.setActivity("Initialization: " + (date.getSeconds()), {type: "PLAYING"}) 
  setInterval(() => {
	const index = Math.floor(Math.random() * (activities_list.length - 1) + 1) // generates a random number between 1 and the length of the activities array list.
	client.user.setActivity(activities_list[index], {type: "STREAMING"}) // sets bot's activities to stream one of the phrases in the arraylist.
  }, 300000) // Runs this every 5 minutes.
})

// listens for a message in the discord server
client.on('message', async message => {
	const args = message.content.slice(prefix.length).split(/ +/)
	const command = args.shift().toLowerCase()
	avatar = client.user.displayAvatarURL
	if(message.content.includes('!help')){
		let sEmbed = new Discord.RichEmbed()
		.setColor('#ffcba4')
		.setTitle("Bridget:")
		.setDescription("A secretary Bot")
		.addField("**!pin**", "pins the last message", true)
		.addField("**!undo**", "unpins the latest pin", true)
		.addField("**thanks**", "you're welcome", true)
		.addField("**pay respects**", "get an F in the chat", true)
		.addField("**!roll**", "random roll between 1 and 100", true)
		.addField("**!help**", "sends this message", true)
		.addField("website: ", "https://Bridget-Bot--ydocsgnillats.repl.co", true)
		.setFooter('BridgetBot2020', avatar)
		return message.channel.send({embed: sEmbed})
	}
	if(message.content.includes('pay respects')){
		message.channel.send("F.")
	}
	if(message.content.includes('thanks')){
		message.channel.send("*UwU*")
	}
	if (!message.content.startsWith(prefix) || message.author.bot) return
	if (!client.commands.has(command)) return message.channel.send('Command Does Not Exist')

	try {
		client.commands.get(command).execute(message, args)
	} 
	catch (error) {
		console.error(error)
		message.reply('there was an error trying to execute that command!')
	}
})

client.off('shutdown', async () => {
	console.log(`${client.user.tag} is shutting down...`)
})

client.login(BOT_TOKEN_HERE)
