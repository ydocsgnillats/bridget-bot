module.exports = message => {
    const ideas = require('./ideas.json')
    const fs = require('fs')
    //ideas[message.author].idea += message;
    var jsonText = fs.readFileSync("./ideas.json")
    var text = JSON.stringify(ideas);
    return message.channel.send("Current notes: " + text)
}
