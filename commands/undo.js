module.exports = {
	name: 'undo',
	description: 'undo!',
	execute(message, args) {
        var msg = message.channel.fetchPinnedMessages()
        var msgArray = Array.from(msg)
        var currMsg = msgArray[(msgArray.length-1)]
        currMsg.unpin()
        return
    }
}
