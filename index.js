require('dotenv').config()

const Discord = require('discord.js')
const Sequelize = require('sequelize')
const client = new Discord.Client()
const fs = require('fs')

const scheduler = require('./commands/scheduler.js')
const note = require('./commands/note.js')
const read = require('./commands/ideaRead.js')
const pin = require('./commands/pin.js')
const clear = require('./commands/clear.js')
const mute = require('./commands/mute.js')
const roll = require('./commands/roll.js')
const activities = require('./commands/activities.js')

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
})

const Ideabase = sequelize.define('ideas', {
	username: {
		type: Sequelize.STRING,
	},
	name: Sequelize.STRING,
	note: Sequelize.TEXT,
	guild: Sequelize.STRING,
	date: Sequelize.DATE,
	idea_count: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
})

var activities_list = activities.activitylist()

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`)
  let date = new Date();
  client.user.setActivity("Initialization: " + (date.getSeconds()), {type: "PLAYING"});
  setInterval(() => {
	const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list.
	client.user.setActivity(activities_list[index], {type: "STREAMING"}); // sets bot's activities to stream one of the phrases in the arraylist.
  }, 300000); // Runs this every 5 minutes.
  Ideabase.sync({ force: true })
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
		idea = message
		return note(message)
	}
	if(message.content.includes('Bridget!')){
		idea = message
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
	if (message.content.startsWith('schedule!')){
		return scheduler(message)
	}
	if(message.content.includes('clear!')){
		return clear(message)
	}
	if(message.content.startsWith('dbFill!')){
		var msg = message.content.split(" ").slice(1).join(" ")
		try {
			// equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
			const dbNote = await Ideabase.create({
				name: 'name3name',
				note: msg,
				username: message.author.username,
			});
			return message.channel.send(`Test ${dbNote.name} added. Content = ${dbNote.note}. From ${dbNote.username}`);
		}
		catch (e) {
			return message.reply('Something went wrong with adding this idea.');
		}
	}
	if(message.content.startsWith('dbFetch!')){
		const k = await Ideabase.findOne({where: { username: message.author.username} })
		if(k){
			k.increment('idea_count')
			return message.channel.send(k.get('note'))
		}
		return message.channel.send(`Could not find name`)
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
