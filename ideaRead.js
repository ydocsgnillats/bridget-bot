module.exports = message => {
    const ideas = require('./ideas.json')
    const fs = require('fs')
    typeof ideas
    ideas[message.author].idea += message;
    var authLength = message.author.length()
    var jsonText = fs.readFileSync("./ideas.json")
    var text = JSON.parse(ideas)
    var result = " "
        for(let i = 0; i < text.author.length; i++){
            let t = text.author[i]
            result += "\n" + i;
            for(j = 0; j < text.author.idea.length; j++)
                let s = text.author.idea[j];
                result += "\n" + j;
        }
    //stringText = JSON.stringify(text)
    return message.channel.send("Current notes: " + result)
}
