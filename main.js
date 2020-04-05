require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client()
const activities = require('./activities.js')
const Sequelize = require('sequelize')
const activities_list = activities.activitylist()
const response = require('./interface.js')

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
    return response.response(message)
})

client.off('shutdown', async () => {
	console.log(`${client.user.tag} is shutting down...`)
})

client.login(process.env.TOKEN)
