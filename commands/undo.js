module.exports = {
	name: 'undo',
	description: 'undo!',
	execute(message, args) {
        var channel = message.channel
        var msg = channel.fetchPinnedMessages()
        var msgArray = Array.from(msg)
        var currMsg = msgArray[0]
        currMsg.unpin()
        return
    }
}