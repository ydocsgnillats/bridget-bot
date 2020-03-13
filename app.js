require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const pin = require('./commands/pin.js')
const roll = require('./commands/roll.js')
const activities = require('./commands/activities.js')
const Sequelize = require('sequelize')

const date = require('date-and-time')
const now = new Date()
date.format(now, 'YYYY/MM/DD HH:mm:ss')
const activities_list = activities.activitylist()

const databaseName = process.env.DATABASE_NAME
const databaseHost = process.env.DATABASE_HOST
const databaseUser = process.env.DATABASE_USER
const databasePort = process.env.DATABASE_PORT
const databasePassword = process.env.DATABASE_PASSWORD

const sequelize = new Sequelize(databaseName, databaseUser, databasePassword, {
	dialect: 'postgres',
	host: databaseHost,
	port: databasePort
});

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
	kill_count: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
})  

const Schedulebase = sequelize.define('schedule', {
	username: {
		type: Sequelize.STRING,
	},
	event: Sequelize.TEXT,
	guild: Sequelize.STRING,
	date: Sequelize.DATE,
})  

const Motionbase = sequelize.define('motion', {
	username: {
		type: Sequelize.STRING,
	},
	motion: Sequelize.TEXT,
	date: Sequelize.DATE,
	guild: Sequelize.STRING
})  

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`)
  let date = new Date()
  client.user.setActivity("Initialization: " + (date.getSeconds()), {type: "PLAYING"}) //need fix
  setInterval(() => {
	const index = Math.floor(Math.random() * (activities_list.length - 1) + 1) // generates a random number between 1 and the length of the activities array list.
	client.user.setActivity(activities_list[index], {type: "STREAMING"}) // sets bot's activities to stream one of the phrases in the arraylist.
  }, 300000); // Runs this every 5 minutes.
  await sequelize.sync()
})

client.on('message', async message => {
	if(message.author.bot || message.channel.type === 'dm') return;
	if(message.content.includes('test!')){
		return message.channel.send("**BRIDGET**")
	}
	if(message.content.startsWith('thanks')){
		return message.channel.send("*UwU*")
	}
	if(message.content.includes('pay respect')){
		return message.channel.send("F.")
	}
	if(message.content.includes('in the chat')){
		return message.channel.send("F.")
	}
	if(message.content.startsWith('pin!')){
		return pin(message)
	}
	if(message.content.startsWith('Pin!')){
		return pin(message)
	}
	if(message.content.includes('undo!')){
		return pin(message) //need fix
	}
	if(message.content.includes('roll!')){
		return roll(message)
	}
	if(message.content.startsWith('motion!'))
	{
		var msg = message.content.split(" ").slice(1).join(" ")
		const filter = m => m.author.id !== message.author.id;
		message.reply("Motion **" + msg + "** initiated. \nDoes anyone second the motion?\n(REPLY yes or no)")
		.then(function(){
			message.channel.awaitMessages(response=>message.content, 
				{
					max: 1, 
					time: 30000,
					errors: ['time'],
				}).then(collected =>{
				if (collected.first().content === "yes"){
					let embed = new Discord.RichEmbed()
						.setTitle("MOTION: ")
						.setColor("BLURPLE")
						.setDescription(msg)
						.setThumbnail(message.user.displayAvatarURL)
						.addField("Author: ", message.author, true)
						.addField("Seconded: ", collected.first().author, true)
						.setFooter('**MOTION GRANTED**', client.user.displayAvatarURL);
						const dbMotion = Motionbase.create({
						motion: msg,
						username: message.author.username,
						guild: message.guild.name,
						date: now,
						})
						dbMotion;
					return message.channel.send(embed)
				}
				else if (collected.first().content === 'no'){
					const r = await message.channel.send("MOTION DENIED")
					return r.delete(5000)
				}
				else if (collected.first().content === 'cancel'){
					const r_1 = await message.reply("Motion Canceled.")
					return r_1.delete(5000)
				}
				}).catch(err =>{ 
					message.reply("Motion " + msg + " denied due to timeout.").then(r => r.delete(5000));
				})
	})}
	if(message.content.startsWith('motions!')){
	 	const motionList = await Motionbase.findAll({ where: {guild: message.guild.name}}, { attributes: ['motion'] })
	 	const motionString = motionList.map(t => t.motion).join(', \n ') || 'No motions stored.'
		return message.channel.send(`Ideas: ${motionString}`)
	}
	if (message.content.startsWith('schedule!')){
		var msgarray = message.content.split(" ").slice(1).join(" ")
		try{
			const sched = await Schedulebase.create({
				username: message.author.username,
				event: msgarray,
				guild: message.guild.name,
				date: now,
			})
			return message.channel.send("When should I remind you about " + "*" + msgarray + "?*" + "**UNDER CONSTRUCTION**").catch(e => console.log(e))
		}
		catch (e) {
			return message.reply('Something went wrong with this event')
		}
	}
	if (message.content.startsWith('kill!')){
		var msg = message.content.split(" ").slice(1).join(" ")
		try {
			const killSet = await Ideabase.update({ kill_count: sequelize.literal('kill_count+1') }, { where: {username: msg} });
			const killGet = await Ideabase.findAll({ where: {guild: message.guild.name}}, { attributes: ['kill_count'] })
			const killString = killGet.map(t => t.kill_count).join(', \n ') || 'No kills stored'
			return message.channel.send(`Killing: ` + msg + '\n' + "Kill Count: " + killString)
		}
		catch (e) {
			return message.reply('This user does not exist')
		}
	}
	if(message.content.includes('clear!')){
		const rowCount = await Ideabase.destroy({ where: { username: message.author.username, guild: message.guild.name} })
		if (!rowCount) return message.reply('That person did not have any ideas.')
		
		return message.reply('Deleted ' + message.author.username + '\'s notes')
	}
	if(message.content.startsWith('bridget!')){
		var msg = message.content.split(" ").slice(1).join(" ")
		try {
			// equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
			const dbNote = await Ideabase.create({
				name: message.author.tag,
				note: msg,
				username: message.author.username,
				guild: message.guild.name,
				date: now,
			})
			//await Ideabase.increment({idea_count: 1}, {where: {username = message.author.username}})
			return message.channel.send(`Writing down: ${dbNote.note}`)
		}
		catch (e) {
			return message.channel.send("There was a problem with this note")
		}
	}
	if(message.content.startsWith('ideas!')){
		const ideaList = await Ideabase.findAll({ where: {guild: message.guild.name}}, { attributes: ['note'] })
		const ideaString = ideaList.map(t => t.note).join(', \n ') || 'No ideas stored.'
		return message.channel.send(`Ideas: ${ideaString}`)
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
		.addField("**kill!**", "kills a user", true)
		.addField("**help!**", "sends this message", true)
		.setFooter('BridgetBot2020', client.user.displayAvatarURL);
		return message.channel.send({embed: sEmbed});
	}
})

client.off('shutdown', async () => {
	console.log(`${client.user.tag} is shutting down...`)
})

client.login(process.env.TOKEN)
