module.exports = message => {
	var msgCollect = message.channel.messages;
	var msgArray = Array.from(msgCollect.values());
	var prevMsg = msgArray[msgArray.length -2];
	return message.channel.send("When should I remind you about " + "*" + prevMsg + "?*")
}
