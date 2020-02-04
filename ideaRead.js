module.exports = message => {
    const ideas = require('./ideas.json')
    const fs = require('fs')
    typeof ideas
    ideas[message.author].idea += message;
    var jsonText = fs.readFileSync("./ideas.json")
    var text = JSON.stringify(ideas)
    var result = " "
        for(var i = 0; i < 10; i++){
            var t = text.author[i]
            result += "\n" + i;
            for(var j = 0; j < 10; j++)
                var s = text.author.idea[j];
                result += "\n" + j;
        }
    //stringText = JSON.stringify(text)
    return message.channel.send("Current notes: " + result)
}
