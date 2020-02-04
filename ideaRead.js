module.exports = message => {
    const ideas = require('./ideas.json')
    const fs = require('fs')
    typeof ideas
    var msg = message.content.split(" ").slice(1).join(" ");
    ideas[message.author.tag].idea += "\n" + msg;
    var jsonText = fs.readFileSync("./ideas.json")
    var text = JSON.parse(jsonText)
    return message.channel.send("Current notes: " + text)
}