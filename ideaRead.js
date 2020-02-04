module.exports = message => {
    const ideas = require('./ideas.json')
    const fs = require('fs')
    typeof ideas
    ideas[message.author].idea += message;
    var jsonText = fs.readFileSync("./ideas.json")
    var text = JSON.stringify(ideas)
    stringText = JSON.stringify(text)
    return message.channel.send("Current notes: " + result)
}
