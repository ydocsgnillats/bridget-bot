module.exports = {
	name: 'undo',
	description: 'undo!',
	execute(message, args) {
        var channel = message.channel
        var msg = channel.fetchPinnedMessages()
        var msgArray = Array.from(msg)
        var currMsg = msgArray[msgArray.length -1]
        currMsg.unpin()
        return
    }
}