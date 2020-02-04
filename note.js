module.exports = message => {
    const ideas = require('./ideas.json')
    const fs = require('fs')
    
    typeof ideas
    var msg = message.content.split(" ").slice(1).join(" ");
    if(!ideas[message.author]){
        ideas[message.author] = {
            idea: " "
        };
    }
    //function logFile(auth, idea){
    //    var author = auth;
     //   var idea = msg + '\r\n';
     //   ideas[message.author].idea += msg + "\r\n" ;
     //   fs.appendFile(JSON.stringify(ideas), author, idea)
    //}

    ideas[message.author].idea += " | " + msg + " | ";
    fs.writeFileSync("./ideas.json", JSON.stringify(ideas))
    //logFile(message.author, msg)
    return message.channel.send("writing *" + msg + "* down...")
} 