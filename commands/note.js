var fs = require("fs");
var stream;
stream = fs.createWriteStream("../ideas/idea.txt");

module.exports = message => {
  var msgCollect = message.channel.messages
  var msgArray = Array.from(msgCollect.values())
  var prevMsg = msgArray[msgArray.length -2]
  message.reply('Writing that down.')	
  // file system module to perform file operations
  stream.write(prevMsg)
  }
