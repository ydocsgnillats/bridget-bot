module.exports = message => {
    const ideas = require('./ideas.json')
    typeof ideas
    var msg = message.content.split(" ").slice(1).join(" ");
    ideas[message.author.tag].idea += "\n" + msg;
    var text = fs.readFileSync("./ideas.json", JSON.stringify(ideas))
    return message.channel.send("Current notes: " + text)
}