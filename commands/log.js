module.exports = message => {
	var msgCollect = message.channel.messages;
	var msgArray = Array.from(msgCollect.values());
	var prevMsg = msgArray[msgArray.length -2];

	var fs = require("fs");

	
    fs.writeFile("../ideas/idea.txt", prevMsg, function (err) {
		if (err) return console.log(err);
	});
}
