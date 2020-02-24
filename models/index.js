if (!global.hasOwnProperty('db')) {
    var Sequelize = require('sequelize')
      , sequelize = null
  
    if (process.env.DATABASE_URL) {
      // the application is executed on Heroku ... use the postgres database
      const sequelize = new Sequelize('database', 'user', 'password', {
    	host: 'process.env.DATABASE_URL',
        dialect:  'postgres',
        protocol: 'postgres',
        logging:  true //false
      })
    } else {
      // the application is executed on the local machine ... use mysql
      sequelize = new Sequelize('bridget-sec-bot-db', 'root', null)
    }
  
    global.db = {
      Sequelize: Sequelize,
      sequelize: sequelize,
      //User:      sequelize.import(__dirname + '/user') 
      // add your other models here
    }

    
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
  
    /*
      Associations can be defined here. E.g. like this:
      global.db.User.hasMany(global.db.SomethingElse)
    */
  }
  
  module.exports = global.db, Ideabase