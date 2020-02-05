require('dotenv').config()

const client = new Discord.Client()

const fs = require('fs')
const Discord = require('discord.js')
const scheduler = require('./scheduler.js')
const note = require('./note.js')
const read = require('./ideaRead.js')
const pin = require('./pin.js')
const clear = require('./clear.js')
const help = require('./help.js')
const mute = require('./mute.js')
const roll = require('./roll.js')
const activities = require('./activities.js')

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`)
  let date = new Date();
  client.user.setActivity("Initialization: " + (date.getSeconds()), {type: "PLAYING"});
  setInterval(() => {
	const index = Math.floor(Math.random() * (activities.activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list.
	client.user.setActivity(activities.activities_list[index], {type: "STREAMING"}); // sets bot's activities to stream one of the phrases in the arraylist.
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
	if(message.content.includes('pay respect')){
		return message.channel.send("F.")
	}
	if(message.content.includes('in the chat')){
		return message.channel.send("F.")
	}
	if(message.content.includes('pin!')){
		return pin(message)
	}
	if(message.content.includes('Pin!')){
		return pin(message)
	}
	if(message.content.includes('undo!')){
		return pin(message)
	}
	if(message.content.includes('bridget!')){
		return note(message)
	}
	if(message.content.includes('Bridget!')){
		return note(message)
	}
	if(message.content.startsWith('ideas!')){
		return read(message)
	}
	if(message.content.includes('mute!')){
		return mute(message)
	}
	if(message.content.includes('roll!')){
		return roll(message)
	}
	if (message.content.startsWith('schedule!')) {
		return scheduler(message)
	}
	if(message.content.includes('clear!')){
		return clear(message)
	}
	if(message.content.includes('help!')){
		return help(message)
	}
})

client.login(process.env.TOKEN)