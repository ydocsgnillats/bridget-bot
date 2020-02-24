require('dotenv').config()

const Discord = require('discord.js')
const Sequelize = require('sequelize')
const client = new Discord.Client()
const fs = require('fs')
const Ideabase = require('dbsetup.js')

const scheduler = require('./commands/scheduler.js')
const pin = require('./commands/pin.js')
const roll = require('./commands/roll.js')
const activities = require('./commands/activities.js')

//const sequelize = new Sequelize('database', 'user', 'password', {
//	host: 'process.env.DATABASE_URL',
//	dialect: 'sqlite',
//	logging: false,
//	storage: 'database.sqlite',
//})

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
	if(message.content.includes('roll!')){
		return roll(message)
	}
	if (message.content.startsWith('schedule!')){
		return scheduler(message)
	}
	if(message.content.includes('clear!')){
		const rowCount = await Ideabase.destroy({ where: { username: message.author.username } });
		if (!rowCount) return message.reply('That person did not exist.');

		return message.reply('ideas deleted.');
	}
	if(message.content.startsWith('bridget!')){
		var msg = message.content.split(" ").slice(1).join(" ")
		try {
			// equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
			const dbNote = await Ideabase.create({
				name: message.author.tag,
				note: msg,
				username: message.author.username,
				guild: message.guild.name
			});
			return message.channel.send(`Writing down: ${dbNote.note}`);
		}
		catch (e) {
			return message.reply('Something went wrong with adding this idea.');
		}
	}
	if(message.content.startsWith('ideas!')){
		const ideaList = await Ideabase.findAll({ where: {guild: message.guild.name}}, { attributes: ['note'] });
		const ideaString = ideaList.map(t => t.note).join(', ') || 'No ideas stored.';
		return message.channel.send(`Ideas: ${ideaString}`);
	}
	if(message.content.includes('help!')){    
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
		.addField("**help!**", "sends this message", true)
		.setFooter('BridgetBot2020', client.user.displayAvatarURL);
		return message.channel.send({embed: sEmbed});
	}
})

client.login(process.env.TOKEN)
