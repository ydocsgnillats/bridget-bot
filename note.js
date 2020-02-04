module.exports = message => {
    const ideas = require('./ideas.json')
    const fs = require('fs')
    
    typeof ideas
    var msg = message.content.split(" ").slice(1).join(" ");
    if(!ideas[message.author.tag]){
        ideas[message.author.tag] = {
            idea: " "
        };
    }
    ideas[message.author.tag].idea += "\n" + msg;
    fs.writeFileSync("./ideas.json", JSON.stringify(ideas))
    return message.channel.send("*writing *" + msg + "* down...*")
}