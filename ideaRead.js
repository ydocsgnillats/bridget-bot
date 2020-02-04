module.exports = message => {
    const ideas = require('./ideas.json')
    const fs = require('fs')
    typeof ideas
    ideas[message.author].idea += message;
    var authLength = message.author.length()
    var jsonText = fs.readFileSync("./ideas.json")
    var text = JSON.parse(jsonText)
    stringText = JSON.stringify(text)
    stringText = stringText.slice((authLength + 11))
    return message.channel.send("Current notes: " + stringText)
}