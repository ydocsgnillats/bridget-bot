require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')

const scheduler = require('./scheduler.js')
const note = require('./note.js')
const read = require('./ideaRead.js')
const pin = require('./pin.js')
const clear = require('./clear.js')
const mute = require('./mute.js')
const roll = require('./roll.js')
const activities = require('./activities.js')

var activities_list = activities.activitylist()

var Datastore = require('nedb')
  , db = new Datastore({ filename: './dbase.db', autoload: true });
var users = new Datastore();
var people = []
var count;
let guild = client.guilds.find(guild => guild.name === "Discord.js Official");

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`)
  let date = new Date();
  client.user.setActivity("Initialization: " + (date.getSeconds()), {type: "PLAYING"});
  setInterval(() => {
	const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list.
	client.user.setActivity(activities_list[index], {type: "STREAMING"}); // sets bot's activities to stream one of the phrases in the arraylist.
  }, 300000); // Runs this every 5 minutes.
})

client.on('message', async message => {
	if(message.author.bot || message.channel.type === 'dm') return;
	if(message.content.includes('test!')){
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
	if (message.content.startsWith('db!')){
		for(count in client.users.array()){
			var user = client.users.array()[count]
			var  guildCheck = message.author.guild
			if(!people[guildCheck]) people[guild] = new Discord.Collection();
			if(user.guild === guildCheck){
				people.push(user);
			}
		}
		users.insert(people, function(err, docs){
		})
		return message.channel.send("test" + people[guild] + "guild" + guildCheck + " count" +count)
	}
	if(message.content.includes('help!')){    
		let sEmbed = new Discord.RichEmbed()
		.setColor('#ffcba4')
		.setTitle("Bridget:")
		.setDescription("A secretary Bot")
		.addField("**bridget!**", "writes things down", true)
		.addField("**ideas!**", "recalls ideas by user", true)
		.addField("**pin!**", "pins the last message", true)
		.addField("**thanks**", "you're welcome", true)
		.addField("**pay respect**", "get an F in the chat", true)
		.addField("**roll!**", "random roll between 1 and 100", true)
		.addField("**schedule!**", "schedule reminders", true)
		.addField("**help!**", "sends this message", true)
		.setFooter('BridgetBot2020', client.user.displayAvatarURL);
		return message.channel.send({embed: sEmbed});
	}
})

client.login(process.env.TOKEN)