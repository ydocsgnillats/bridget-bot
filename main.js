require('dotenv').config()

const Discord = require('discord.js')
const fs = require('fs')
const http = require('http')
const Sequelize = require('sequelize')
const prefix = process.env.PREFIX
const activities = require('./activities.js')
const activities_list = activities.activitylist()

const client = new Discord.Client()
client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

//setting up postgres databases using sequelize 
const databaseName = process.env.DATABASE_NAME
const databaseHost = process.env.DATABASE_HOST
const databaseUser = process.env.DATABASE_USER
const databasePort = process.env.DATABASE_PORT
const databasePassword = process.env.DATABASE_PASSWORD

const sequelize = new Sequelize(databaseName, databaseUser, databasePassword, {
	dialect: 'postgres',
	host: databaseHost,
	port: databasePort,
	logging: false,
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

// ping the bot periodically to keep it from idling
function noIdle() {
    setInterval(function() {
        var options = {
            host: 'bridget-sec-bot.herokuapp.com',
            port: 80,
            path: '/'
        };
        http.get(options, function(res) {
            res.on('data', function(chunk) {
                try {
                    // optional logging... disable after it's working
                    console.log("Bridget RESPONSE: " + chunk);
                } catch (err) {
                    console.log(err.message);
                }
            });
        }).on('error', function(err) {
            console.log("Error: " + err.message);
        });
    }, 20 * 60 * 1000); // load every 20 minutes
}
noIdle();

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
  await sequelize.sync()
})

// listens for a message in the discord server
client.on('message', async message => {
	const args = message.content.slice(prefix.length).split(/ +/)
	const command = args.shift().toLowerCase()
	if(message.content.includes('pay respects')){
		message.channel.send("F.")
	}
	if(message.content.includes('thanks')){
		message.channel.send("*UwU*")
	}
	if (!message.content.startsWith(prefix) || message.author.bot) return
	if (!client.commands.has(command)) return

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

client.login(process.env.TOKEN)
