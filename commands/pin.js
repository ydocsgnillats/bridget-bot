module.exports = {
        name: 'pin',
	description: 'Pin!',
	execute(message, args) {
                var msgCollect = message.channel.messages
                var msgArray = Array.from(msgCollect.values())
                var prevMsg = msgArray[msgArray.length -2]
                prevMsg.pin()
                return
	}
}
